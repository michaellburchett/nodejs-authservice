const express = require('express');
const router = express.Router();
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const login = require('connect-ensure-login');
const cryptoRandomString = require('crypto-random-string');
const server = oauth2orize.createServer();

const Client = require('../models/Client.js');
const AuthorizationCode = require('../models/AuthorizationCode.js');
const AccessToken = require('../models/AccessToken.js');


server.grant(oauth2orize.grant.code(async (client, redirectURI, user, ares, done) => {
    const code = cryptoRandomString({length: 15, type: 'url-safe'});;

    const authorizationCode = await AuthorizationCode.create({
        userId: user.id,
        clientId: client.id,
        code: code,
        redirectURI: redirectURI,
        ares_scope: JSON.stringify(ares)
    });

    return done(null, authorizationCode.code);
}));

server.exchange(oauth2orize.exchange.code(async (client, code, redirectUri, done) => {

    const auth_code = (await AuthorizationCode.findOne({where: {code: code}}));//catch errors
    if(!auth_code) return done("Sorry, Can't find a token");

    let date = new Date();
    date.setDate(date.getDate() + 60);

    const token = cryptoRandomString({length: 150, type: 'url-safe'});
    const refreshtoken = cryptoRandomString({length: 150, type: 'url-safe'});

    const accessToken = await AccessToken.create({
        userId: auth_code.userId,
        clientId: client.id,
        authorizationCodeId: auth_code.id,
        token: token,
        type: "bearerStrategy",
        refreshToken: refreshtoken,
        expirationDate: date
    });

    return done(null, accessToken.dataValues);
}));

server.serializeClient(async function(client, done) {
    const unserialized_client = (await Client.findOne({where: {
        clientId: client.clientId,
        clientSecret: client.clientSecret
    }})).dataValues;

    return done(null, unserialized_client.id);
});
server.deserializeClient(async function(id, done) {
    const client = (await Client.findByPk(id)).dataValues;

    return done(null, client);
});

router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('message')[0] });
});

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/dialog/authorize',
    login.ensureLoggedIn(),
    server.authorize(async function(clientID, redirectURI, done) {
        const client = (await Client.findOne({where: { clientId: clientID }})).dataValues;

        return done(null, client, client.redirectURI);
    }),
    function(req, res) {
        res.render('dialog', {
            transactionID: req.oauth2.transactionID,
            user: req.user,
            client: req.oauth2.client
        });
    });

router.post('/dialog/authorize/decision',
    login.ensureLoggedIn(),
    server.decision()
);

router.post('/dialog/authorize/decision',
    login.ensureLoggedIn(),
    server.decision());

router.post('/oauth/token',
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler());

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const login = require('connect-ensure-login');
const server = oauth2orize.createServer();

const Client = require('../models/Client.js');
const AuthorizationCode = require('../models/AuthorizationCode.js');


server.grant(oauth2orize.grant.code(async (client, redirectURI, user, ares, done) => {
    const code = '123142342342134234214244123';

    const authorizationCode = await AuthorizationCode.create({
        code: code,
        client_id: client.clientId,
        redirectURI: redirectURI,
        ares_scope: JSON.stringify(ares),
        user_id: user.id
    });

    return done(null, authorizationCode.code);
}));

server.serializeClient(async function(client, done) {
    const unserialized_client = (await Client.findOne({where: {
            clientId: clientId,
            clientSecret: clientSecret
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

router.post('/token',
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler());

module.exports = router;
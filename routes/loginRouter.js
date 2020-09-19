const express = require('express');
const router = express.Router();
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const login = require('connect-ensure-login');
const server = oauth2orize.createServer();

router.get('/login', function(req, res) {
    res.render('login', { message: "This is the message" });
});

router.get('/dialog/authorize',
    login.ensureLoggedIn(),
    server.authorize(function(clientID, redirectURI, done) {
        //Find the client and 'return done(null, client, client.redirectURI);'

        // Clients.findOne(clientID, function(err, client) {
        //     if (err) { return done(err); }
        //     if (!client) { return done(null, false); }
        //     if (client.redirectUri != redirectURI) { return done(null, false); }
        //     return done(null, client, client.redirectURI);
        // });
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
    server.decision());

router.post('/token',
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler());

module.exports = router;
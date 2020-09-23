const express = require('express');
const router = express.Router();
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const login = require('connect-ensure-login');
const server = oauth2orize.createServer();

//oauth2orize Config
server.grant(oauth2orize.grant.code(async (client, redirectURI, user, ares, done) => {
    return done(null, 'the_code');
}));
//
server.serializeClient(function(client, done) {
    return done(null, 'the_client_id');
});
server.deserializeClient(function(id, done) {
    return done(null, 'the_client');
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
    server.authorize(function(clientID, redirectURI, done) {
        //Find the client and 'return done(null, client, client.redirectURI);'

        // Clients.findOne(clientID, function(err, client) {
        //     if (err) { return done(err); }
        //     if (!client) { return done(null, false); }
        //     if (client.redirectUri != redirectURI) { return done(null, false); }
        //     return done(null, client, client.redirectURI);
        // });
        return done(null, 'the_client', 'https://www.google.com');
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
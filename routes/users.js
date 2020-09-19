const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET logged in user (PROTECTED). */
router.get('/api/userinfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json(req.user);
    });

module.exports = router;

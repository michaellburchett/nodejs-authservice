modules.exports.get = [
    function(req, res) {
        res.render('login',
            {
                errorMessage: req.flash('errorMessage')[0],
                successMessage: req.flash('successMessage')[0]
            });
    }
];

modules.exports.post = [
    passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
];
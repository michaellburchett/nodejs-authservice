module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    //Login
    const loginController = require('../controllers/loginController.js');
    router.get('/login', loginController.get);
    router.post('/login', loginController.post);

    //OAuth Endpoints
    const oauth2Controller = require('../controllers/oauth2Controller.js');
    router.get('/dialog/authorize', oauth2Controller.authorize);
    router.post('/dialog/authorize/decision', oauth2Controller.decision);
    router.post('/oauth/token', oauth2Controller.token);

    //User
    const userController = require('../controllers/userController.js');
    app.get('/api/userinfo', userController.get);
}

"use strict";
const express = require('express');
const router = express.Router();

function getRouter(authService) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.get('/login', function(req, res, next) {
        res.render('login');
    });

    router.get('/logout', function(req, res, next) {
        res.clearCookie('signedIn');
        res.redirect('/');
    });

    router.post('/login', function(req, res, next) {
        const login = req.body.login;
        const password = req.body.password;
        authService.getUser(login, password)
            .then(user => {
                res.cookie('signedIn', true, { signed: true });
                res.redirect('/users/profile');
            })
            .catch(err => {
                console.error(err);
                req.flash('error', 'The login or password is incorrect')
                res.redirect('/login');
            });
    });

    return router;
}


module.exports = getRouter;

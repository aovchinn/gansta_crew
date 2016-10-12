"use strict";
const express = require('express');
const router = express.Router();
const crypto = require("crypto");

// const AuthService = require("../js/auth/authService");
//
// const secret = "abcdefg";
// function getHash(str) {
//     return crypto.createHmac("sha256", secret)
//         .update(str)
//         .digest("hex");
// }

const authService = new AuthService({
    findByName: function(name) {
        if (name === "admin") {
            return {
                id: 1,
                login: "admin",
                name: "someName",
                surname: "surname",
                password: getHash("admin")
            }
        }
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    authService
});

module.exports = router;

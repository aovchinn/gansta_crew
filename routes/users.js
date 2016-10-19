"use strict";
const express = require('express');
const router = express.Router();
const authMiddleware = require('../js/auth/authMiddleware');

router.use(authMiddleware);
router.get('/profile', function(req, res, next) {
    res.render('profile');
});

module.exports = router;

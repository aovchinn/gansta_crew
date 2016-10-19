"use strict";

const DbService = require('./js/db/dbService');
const getHash = require('./js/helpers').getHash;

const dbService = new DbService('prodDb');

dbService.insertUser({
        name: 'admin ivanich',
        login: 'admin',
        password: getHash('admin')
    })
    .then(console.log.bind(console))
    .catch(console.error.bind(console));

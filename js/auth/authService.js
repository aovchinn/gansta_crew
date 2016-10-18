"use strict";
const R = require("ramda");
const getHash = require("../helpers").getHash;

class AuthService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    getUser(login, password) {
        return this.dbService.findByLogin(login)
            .then(user => {
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.password === getHash(password)) {
                    return R.dissoc("password", user);
                }
                throw new Error("Password is incorrect");
            });
    }
}
module.exports = AuthService;

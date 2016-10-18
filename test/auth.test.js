"use strict" ;
const chai = require("chai");
const Promise = require("bluebird");
const R = require("ramda");

const AuthService = require("../js/auth/authService");

const expect = chai.expect;

const getHash = require("../js/helpers").getHash;

const users = [{
    id: 1,
    login: "admin",
    name: "someName",
    surname: "surname",
    password: getHash("admin")
},{
    id: 2,
    login: "vasya",
    name: "someName",
    surname: "surname",
    password: getHash("loh")
}];

const dbService = {
    findByLogin: function(login) {
        const user = users.find(rec => rec.login === login) || null;
        return Promise.resolve(user);
    }
};

describe("Auth module test", function() {
    const authService = new AuthService(dbService);

    it("should succeed if user credentials are in db", function() {
        return authService.getUser("admin", "admin")
            .then(user => {
                expect(user).to.eql(R.dissoc("password", users[0]));
            });
    });

    it("should throw exception if password is incorrect", function() {
        return authService.getUser("admin", "lol")
            .then(user => {
                throw "Password should not pass";
            })
            .catch(err => {
                expect(err.message).to.eql("Password is incorrect");
            });
    });

    it("should throw error if user was not found", function() {
        return authService.getUser("manager", "lol")
            .then(user => {
                throw "User should not be found";
            })
            .catch(err => {
                expect(err.message).to.eql("User not found");
            });
    });
});

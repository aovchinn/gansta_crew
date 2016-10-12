"use strict" ;
const chai = require("chai");
const sinon = require("sinon");
const R = require("ramda");

const expect = chai.expect;

const DbService = require("../js/db/dbService");

describe("dbService test", function() {
    let dbService;
    const dbName = "test-db"

    beforeEach(function() {
        dbService = new DbService(dbName);
    });

    afterEach(function() {
        return dbService.dropDatabase();
    });

    it("should be able to insert user into database", function() {
        const user = {
            name: "someName",
            login: "vasya",
            password: "poh"
        };
        return dbService.insertUser(user)
            .then(id => {
                expect(typeof id).to.eql("string");
            });
    });

    it("should be able to find user by id", function() {
        const user = {
            name: "someName",
            login: "vasya",
            password: "poh"
        };
        let _id;
        return dbService.insertUser(user)
            .then(id => {
                _id = id;
                return dbService.findById(id);
            })
            .then(foundUser => {
                expect(R.assoc("id", _id, user)).to.be.eql(foundUser);
            });
    });

    it("should be able to find a user by name", function() {
        const user = {
            name: "someName",
            login: "vasya",
            password: "poh"
        };
    });
});

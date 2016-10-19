"use strict" ;
const chai = require("chai");
const Promise = require("bluebird");
const sinon = require("sinon");

const expect = chai.expect;

const authMiddleware = require("../js/auth/authMiddleware");

describe("Auth middleware test", function() {
    it("should redirect to login page if user is not authenticated", function() {
        const req = {
            signedCookies: {}
        };
        const res = {
            redirect: sinon.spy()
        };
        const next = sinon.spy();
        authMiddleware(req, res, next);
        expect(next.called).to.be.false;
        expect(res.redirect.calledWith("/login")).to.be.true;
    });

    it("should pass if user is signed in", function() {
        const req = {
            signedCookies: {
                signedIn: true
            }
        };
        const res = {
            redirect: sinon.spy(),
            locals: {}
        };
        const next = sinon.spy();
        authMiddleware(req, res, next);
        expect(res.redirect.called).to.be.false;
        expect(next.called).to.be.true;
    });
});

"use strict";
const pmongo = require('promised-mongo');
const R = require("ramda");

const baseUrl = "mongodb://172.17.0.2:27017";
const collection = "user";

class DbService {
    constructor(dbName) {
        this.dbName = dbName;
    }
    dropDatabase() {
        const db = pmongo(`${baseUrl}/${this.dbName}`, [collection]);
        return db[collection].remove({});
    }
    insertUser(user) {
        const db = pmongo(`${baseUrl}/${this.dbName}`, [collection]);
        return db[collection].insert(R.clone(user))
            .then(res => String(res._id));
    }
    findById(id) {
        const db = pmongo(`${baseUrl}/${this.dbName}`, [collection]);
        return db[collection].findOne({
                _id: pmongo.ObjectId(id)
            })
            .then(user => {
                const id = user._id.toString();
                return R.compose( R.assoc("id", id), R.omit("_id"))(user)
            });
    }
}
module.exports = DbService;

const crypto = require('crypto');
const secret = "abcdefg";

function getHash(str) {
    return crypto.createHmac("sha256", secret)
        .update(str)
        .digest("hex");
}

module.exports = {
    getHash
};

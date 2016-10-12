module.exports = function(req, res, next) {
    if (!req.signedCookies.signedIn) {
        res.redirect("/login");
    } else {
        next();
    }
};

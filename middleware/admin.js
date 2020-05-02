module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.send(403).send('Access denied.');
    next();
};

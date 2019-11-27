module.exports = function(req, res, next) {
  if (!req.body.isAdmin) {
    return res.status(403).send("Access denied...");
  }
  next();
};

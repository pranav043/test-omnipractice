const authenticateUser = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(403).json({
      message: "Authentication failed. User session expired or not logged in.",
    });
  }
};

module.exports = authenticateUser;

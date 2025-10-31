const welcome = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Thank you for logging in, you can now navigate to all other links.' : 'You are logged out. Please go to /login to log in and access more links.');
}

module.exports = {
  welcome,
};
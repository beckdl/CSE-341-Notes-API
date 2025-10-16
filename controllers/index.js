const welcome = (req, res) => {
  res.send('Welcome to the Notes API! To get started go to /notes. To get to Swagger, go to /api-docs');
}

module.exports = {
  welcome,
};
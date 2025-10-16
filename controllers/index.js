const welcome = (req, res) => {
  res.send('Welcome to the Notes API! To get started go to /notes.');
}

module.exports = {
  welcome,
};
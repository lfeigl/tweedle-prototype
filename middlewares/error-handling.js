/* eslint no-unused-vars: 0, no-underscore-dangle: 0, no-console: 0 */

module.exports = (err, req, res, next) => {
  if (err.errors) {
    const error = err.errors[0];
    const status = err._headers.status[0];
    const statusCode = status.substring(0, 3);
    const statusText = status.substring(4, status.length);

    console.error(`Twitter API error ${error.code}: ${error.message}`);
    res.status(statusCode).send(statusText);
  } else {
    console.error(err.stack);
    res.status(500).send(err.message);
  }
};

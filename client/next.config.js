const withImages = require('next-images');
module.exports = withImages({
  env: {
    REACT_APP_CONTAINER: process.env.REACT_APP_CONTAINER
  }
});

const cld = require('cld');

module.exports = {
  detect: function (text) {
    return new Promise((res, rej) => {
      cld.detect(text).then(result => {
        if (result.languages.length == 0 || result.languages[0].percent < 85) {
          rej(new Error('Not enough reliable text'));
          return;
        }
        res(result.languages[0].code);
      }, rej);
    });
  }
};

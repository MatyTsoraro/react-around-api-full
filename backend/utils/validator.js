const regexpURL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gim;

const validatorURL = (url) => regexpURL.test(url);

module.exports = {
  validatorURL,
};

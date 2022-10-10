export const config = {
websites: {
    dicionarioInformal: function (query) {
      return `https://www.dicionarioinformal.com.br/${query.replace(
        /\s/g,
        '%20'
      )}`;
    },
  },
};

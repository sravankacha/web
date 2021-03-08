import minify from 'minify';
const options = {
  html: {
    removeAttributeQuotes: false
  },
  css: {
    compatibility: '*'
  },
  js: {
    ecma: 5
  },
  img: {
    maxSize: 4096
  }
};

minify();

var config = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React',
    },
    global: 'CreditCard',
    jsNext: true,
    umd: true
  },
  karma: {
    frameworks: ['mocha', 'es6-shim'],
    plugins: [
      require('karma-es6-shim'),
      require('es6-shim'),
    ],
    extra: {

    }
  },
  webpack: {
    compat: {
      enzyme: true,
      sinon: true,
    },
    extra: {
      module: {
        noParse: /sinon/
      },
      resolve: {
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/addons': true, // important!!
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    }
  }
};

module.exports = config;
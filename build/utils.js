var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')
var chalk = require('chalk')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.getEntries = function (globPath) {
  let entries = {},
    extname,
    tmp,
    pathname;
  if (process.argv.length > 2) {
    if (process.argv[2] === 'public') {
      globPath = globPath.replace('**', process.argv[2] + '/**');
    } else {
      globPath = globPath.replace('**', process.argv[2]);
    }
  } 

  glob.sync(globPath).forEach((entry) => {
    extname = path.parse(entry).ext;
    pathname = path.parse(entry).dir.slice(6);
    if (process.argv.length <= 2 && config.build.whiteList.length > 0) {
      if(config.build.whiteList.indexOf(pathname.slice(7)) === -1) return;
    }
     entries[pathname] = entry;    
     console.log(extname, chalk.blue(pathname));  
  });
  return entries;
};

exports.setHtmlOutputPlugin = function (pages) {
  let htmlPlugins = [];
  for (let pathname in pages) {
    let arr = ['manifest', 'vendor', pathname];
      htmlPlugins.push({
      filename: pathname + '.html',
      template: pages[pathname],
      inject: true,
      minify: {
        removeComments: true,         // 带html注释
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
      },
      hash: false,
      chunks: arr,
      chunksSortMode: 'dependency'
  })
  }
  return htmlPlugins;
}

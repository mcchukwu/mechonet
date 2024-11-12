module.exports = {
    plugins: [
      require('postcss-import'), 
      require('postcss-custom-media'), 
      require('postcss-color-mod-function'), 
      require('postcss-mixins'), 
      require('postcss-nested'), 
      require('postcss-preset-env')({ 
        stage: 1, 
        features: {
          'custom-media-queries': true,
          'color-mod-function': true,
          'nesting-rules': true
        }
      }),
      require('cssnano')({ preset: 'default' }) 
    ]
  };
  
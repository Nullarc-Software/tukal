module.exports = {
	configureWebpack: {
	  devtool: 'source-map'
	},
    chainWebpack: config => {       
        config.module
          .rule('ts')
          .use('ts-loader')
          .tap(options => {
            options.transpileOnly = false
            options.happyPackMode = false
            options.compilerOptions = {
              declaration: true,
              noEmit: false,
              outDir: 'dist',
              experimentalDecorators: true
            }
            return options;
          });

        config.optimization.minimize(true);
    },
    css: {
        extract: {
          ignoreOrder: true
        },
    }
}
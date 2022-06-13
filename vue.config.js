module.exports = {
	configureWebpack: {
		devtool: "source-map"
	},
	chainWebpack: config => {
		config.module
			.rule("ts")
			.use("ts-loader")
			.tap(options => {
				options.transpileOnly = false;
				options.happyPackMode = false;
				options.compilerOptions = {
					declaration: true,
					noEmit: false,
					outDir: "dist",
					experimentalDecorators: true
				};
				return options;
			});
		config.module.rule("vue").uses.delete("cache-loader");
		config.module.rule("js").uses.delete("cache-loader");
		config.module.rule("ts").uses.delete("cache-loader");
		config.module.rule("tsx").uses.delete("cache-loader");
		config.optimization.minimize(true);		
	},
	css: {
		extract: false
	},
	parallel: false
};

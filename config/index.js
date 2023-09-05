const config = {
	// 项目名称
	projectName: "CC NET",
	// 项目创建日期
	date: "2020-12-21",
	// 设计稿尺寸
	designWidth: 750,
	// 设计稿尺寸换算规则
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
	},
	// 项目源码目录
	sourceRoot: "src",
	// 项目产出目录
	outputRoot: "dist",
	// Taro 插件配置
	plugins: ["@tarojs/plugin-http"],
	// 全局变量设置
	defineConstants: {},
	// 文件 copy 配置
	copy: {
		patterns: [],
		options: {},
	},
	// 框架，react，nerv，vue, vue3 等
	framework: "vue3",
	compiler: "webpack5",
	cache: {
		enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
		type: "filesystem",
	},
	// 小程序端专用配置
	mini: {
		webpackChain(chain) {
			chain.merge({
				module: {
					rule: {
						mjsScript: {
							test: /\.mjs$/,
							include: [/pinia/],
							use: {
								babelLoader: {
									loader: require.resolve("babel-loader"),
								},
							},
						},
					},
				},
			});
		},
		postcss: {
			autoprefixer: {
				enable: true,
			},
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: [/van-/],
				},
			},
			// 小程序端样式引用本地资源内联配置
			url: {
				enable: true,
				config: {
					limit: 10240, // 设定转换尺寸上限
				},
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: "module", // 转换模式，取值为 global/module
					generateScopedName: "[name]__[local]___[hash:base64:5]",
				},
			},
		},
	},
	// H5 端专用配置
	h5: {
		publicPath: "/",
		staticDirectory: "static",
		esnextModules: ["taro-ui"],
		postcss: {
			autoprefixer: {
				enable: true,
				config: {},
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: "module", // 转换模式，取值为 global/module
					generateScopedName: "[name]__[local]___[hash:base64:5]",
				},
			},
		},
		// 自定义 Webpack 配置
		webpackChain(chain, webpack) {},
		devServer: {},
	},
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === "development") {
		return merge({}, config, require("./dev"));
	}
	return merge({}, config, require("./prod"));
};

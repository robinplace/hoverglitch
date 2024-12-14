import { Configuration } from '@rspack/cli'
import {
	EnvironmentPlugin,
	DefinePlugin,
	HtmlRspackPlugin,
	ProvidePlugin,
	SwcJsMinimizerRspackPlugin,
} from '@rspack/core'
import { TamaguiPlugin } from 'tamagui-loader'
import { resolve } from 'path'
import module from 'module'

// @ts-ignore nasty hack to allow the tamagui compiler to monkey patch stuff
module._extensions = { ...module._extensions }

export const is_production = process.env.NODE_ENV === `production`
export const standard_extension_array = [`.js`, `.jsx`, `.ts`, `.tsx`, `.json`]

export default {
	entry: `./src/root.ts`,
	experiments: {
		css: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: `builtin:swc-loader`,
					options: { jsc: { parser: { syntax: `ecmascript` } } },
				},
				type: `javascript/auto`,
			},
			{
				test: /\.js$/,
				// every directory that needs to be compiled by Babel during the build.
				include: [
					resolve(import.meta.dirname, `./node_modules/react-native`),
					resolve(import.meta.dirname, `./node_modules/react-native-svg`),
					resolve(import.meta.dirname, `./node_modules/@react-native/assets-registry`),
					resolve(import.meta.dirname, `./node_modules/@mgcrea/react-native-dnd`),
				],
				use: {
					loader: `babel-loader`,
					options: {
						cacheDirectory: true,
						// the `metro-react-native-babel-preset` preset is recommended to match React Native`s packager
						presets: [`module:metro-react-native-babel-preset`],
						// re-write paths to import only the modules needed by the app
						plugins: [
							[`react-native-web`, { commonjs: true }],
							`@babel/plugin-transform-export-namespace-from`,
							`react-native-reanimated/plugin`,
						],
					},
				},
			},
			{
				test: /\.tsx$/,
				use: {
					loader: `builtin:swc-loader`,
					options: { jsc: { parser: { syntax: `typescript`, tsx: true } }, parseMap: true },
				},
				type: `javascript/auto`,
			},
			{
				test: /\.ts$/,
				use: {
					loader: `builtin:swc-loader`,
					options: { jsc: { parser: { syntax: `typescript` } }, parseMap: true },
				},
				type: `javascript/auto`,
			},
		],
	},
	resolve: {
		extensions: [
			...standard_extension_array.map((extension) => `.web${extension}`), //
			...standard_extension_array,
			`.d.ts`,
		],
		alias: {
			'react-native$': `react-native-web`,
		},
	},
	plugins: [
		new EnvironmentPlugin([`NODE_ENV`]),
		new TamaguiPlugin({
			config: `./src/tamagui.config.ts`,
			components: [`tamagui`],
			disableExtraction: !is_production,
		}),
		new HtmlRspackPlugin({
			title: `hoverglitch`,
			inject: false,
			templateContent: ({ htmlRspackPlugin }) => `
			<html>
				<head>
					${htmlRspackPlugin.tags.headTags}
				</head>
				<body>
					<div id="root"></div>
					${htmlRspackPlugin.tags.bodyTags}
				</body>
			</html>
		`,
		}),
		new ProvidePlugin({ React: `react` }),
		new DefinePlugin({
			DEV: !is_production,
			__DEV__: !is_production,
			'process.env': `({})`,
			'process.env.BUILD': JSON.stringify(`web`),
		}),
	],
	optimization: {
		minimizer: [new SwcJsMinimizerRspackPlugin({ minimizerOptions: { compress: true, mangle: true } })],
	},
	output: {
		path: resolve(import.meta.dirname, `./web`),
	},
} satisfies Configuration

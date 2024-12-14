import '@tamagui/core/reset.css'
import { config } from '@tamagui/config/v3'
import { createFont, createTamagui } from '@tamagui/core'

// font creation and setup
const bodyFont = createFont({
	family: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif`,
	size: {
		small: 13,
		true: 13,
		medium: 16,
		large: 20,
	},
	lineHeight: {},
	weight: {
		light: `$light`,
		true: `$regular`,
		bold: `$bold`,
	},
	letterSpacing: {
		1: 0,
		true: 0,
	},
})

export const tamaguiConfig = createTamagui({
	...config,

	fonts: {
		body: bodyFont,
	},
})

type TamaguiConfig = typeof tamaguiConfig
declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends TamaguiConfig {}
}

export default tamaguiConfig


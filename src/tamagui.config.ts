import '@tamagui/core/reset.css'
import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

export const tamaguiConfig = createTamagui({
	...config,
})

type TamaguiConfig = typeof tamaguiConfig
declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends TamaguiConfig {}
}

export default tamaguiConfig

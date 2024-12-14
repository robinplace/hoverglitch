import { AppRegistry } from 'react-native'
import { App } from './App'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: `production` | `development`
			BUILD: `web` | `native`
		}
	}
}

export const is_production = process.env.NODE_ENV === `production`
export const is_web = process.env.BUILD === `web`

const APP = `App`
AppRegistry.registerComponent(APP, () => App)
AppRegistry.runApplication(APP, {
	rootTag: is_web ? document.getElementById(`root`) : undefined,
})

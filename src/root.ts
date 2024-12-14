import { AppRegistry } from 'react-native'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { createElement } from 'react'

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

if (is_web) {
	const node = document.createElement(`div`)
	document.body.appendChild(node)
	const root = createRoot(node)
	root.render(createElement(App))
} else {
	const APP = `App`
	AppRegistry.registerComponent(APP, () => App)
	AppRegistry.runApplication(APP, {
		
	})
}


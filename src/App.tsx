import { FC, PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Select, TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from './tamagui.config'

export const App: FC = () => (
	<TamaguiProvider config={tamaguiConfig}>
		<GlobalTheme color={`dark`}>
			<SelectTest />
		</GlobalTheme>
	</TamaguiProvider>
)

const GlobalTheme: FC<PropsWithChildren<{ color: `dark` | `light` }>> = ({ color, children }) => {
	useLayoutEffect(() => {
		const to_add = `t_${color}`
		const { classList } = document.documentElement
		if (!classList.contains(to_add)) {
			const toRemove = color === `light` ? `dark` : `light`
			classList.remove(`t_${toRemove}`)
			classList.add(to_add)
		}
	}, [color])

	return <Theme name={color}>{children}</Theme>
}

const SelectTest: FC = () => {
	const [val, set_val] = useState('hi')

	return (
		<Select value={val} onValueChange={set_val} defaultValue="hi">
			<Select.Trigger>
				<Select.Value placeholder="Search..." />
			</Select.Trigger>
			<Select.Content>
				<Select.ScrollUpButton />
				<Select.Viewport>
					<Select.Group>
						<Select.Item index={0} value={`hi`}>
							<Select.ItemText>Hi</Select.ItemText>
						</Select.Item>
						<Select.Item index={1} value={`bye`}>
							<Select.ItemText>Bye</Select.ItemText>
						</Select.Item>
						<Select.Item index={2} value={`maybe`}>
							<Select.ItemText>Maybe</Select.ItemText>
						</Select.Item>
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton />
			</Select.Content>
		</Select>
	)
}

import { FC, PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Select, TamaguiProvider, Theme, YStack } from 'tamagui'
import tamaguiConfig from './tamagui.config'
import { ChevronDown } from '@tamagui/lucide-icons'

export const App: FC = () => {
	const [color, set_color] = useState(`dark` as `dark` | `light`)

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log(`switching color`)
			set_color(color === `light` ? `dark` : `light`)
		}, 2000)
		return () => clearTimeout(timer)
	}, [color, set_color])

	return (
		<TamaguiProvider config={tamaguiConfig}>
			<GlobalTheme color={color}>
				<YStack padding={`$4`}>
					<SelectTest />
				</YStack>
			</GlobalTheme>
		</TamaguiProvider>
	)
}

const GlobalTheme: FC<PropsWithChildren<{ color: `dark` | `light` }>> = ({ color, children }) => {
	useLayoutEffect(() => {
		const to_add = `t_${color}`
		const { classList } = document.documentElement
		const to_remove = color === `light` ? `dark` : `light`
		classList.remove(`t_${to_remove}`)
		classList.add(to_add)
	}, [color])

	return <Theme name={color}>{children}</Theme>
}

const SelectTest: FC = () => {
	const [val, set_val] = useState('hi')

	return (
		<Select value={val} onValueChange={set_val} defaultValue="hi">
			<Select.Trigger width={200} iconAfter={ChevronDown}>
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

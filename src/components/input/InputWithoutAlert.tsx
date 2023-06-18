import React from 'react'
import styled from 'styled-components'
import './input.css'
import {overrideTypeScript} from '@craco/craco/dist/lib/features/webpack/typescript'

interface inputType {
	title: string,
	titleDP: boolean,
	placeholder: string,
	name: string,
	max: number,
	type: string,
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	value?: string | null,
	disabled?: boolean | undefined
}
function InputWithoutAlert({
	title,
	titleDP = true,
	placeholder,
	name,
	max,
	type,
	onchange,
	value = null,
	disabled = false
}:inputType) {

	return (
		<div className={'inputArea'}>
			<TitleArea titledp={titleDP.toString()}><div className={'inputTitle'}>{title}</div></TitleArea>
			<input type={type} name={name} placeholder={placeholder} maxLength={max} onChange={onchange} disabled={disabled} />
		</div>
	)
}

type TitleType = {
	titledp: string
}

const TitleArea = styled.div<TitleType>`
	visibility: ${props => props.titledp === 'true' ? 'visible' : 'hidden'};
	height: 2rem;
`

export default React.memo(InputWithoutAlert)
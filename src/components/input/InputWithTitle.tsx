import React from 'react'
import styled from 'styled-components'
import './input.css'



interface inputType {
	title: string,
	placeholder: string,
	name: string,
	max: number,
	type: string,
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	value?: string | null
}
function InputWithTitle({
	title,
	placeholder,
	name,
	max,
	type,
	onchange,
	value = null
}:inputType) {

	return (
		<div className={'inputArea'}>
			<span className={'inputTitle'}>{title}</span>
			<input type={type} name={name} placeholder={placeholder} maxLength={max} onChange={onchange} />
		</div>
	)
}


export default React.memo(InputWithTitle)
import React from 'react'
import './input.css'
import {Alert} from '@components'

interface inputType {
	placeholder: string,
	name: string,
	max: number,
	type: string,
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	value?: string | null,
	message?: string | null
}
function InputTitleType({
	placeholder,
	name,
	max,
	type,
	onchange,
	value = null,
	message
}:inputType) {

	return (
		<div className={'inputForTypeArea'}>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				maxLength={max}
				onChange={onchange}
				defaultValue={value!}
				className={'inputForTitleType'}
			/>
			{message && <Alert title={message} alertdisplay={true} />}
		</div>
	)
}

export default React.memo(InputTitleType)
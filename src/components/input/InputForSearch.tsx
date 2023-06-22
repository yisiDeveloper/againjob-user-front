import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import './input.css'
import {overrideTypeScript} from '@craco/craco/dist/lib/features/webpack/typescript'
import {Alert} from '@components'

interface inputType {
	name: string,
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	// onkeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
	value?: any,
	message?: string | null
}
function InputForSearch({
	name,
	onchange,
	// onkeydown,
	value,
	message
}:inputType) {

	return (
		<div className={'inputAreaForSearch'}>
			<input
				type='text'
				name={name}
				placeholder={'검색어를 입력해주세요.'}
				maxLength={50}
				onChange={onchange}
				className={'inputForSearch'}
				defaultValue={value}
				// onKeyDown={onkeydown}
			/>
			{message && <Alert title={message} alertdisplay={true} />}
		</div>
	)
}


export default React.memo(InputForSearch)
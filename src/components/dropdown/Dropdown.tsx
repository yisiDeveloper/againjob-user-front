import React, {useCallback, useRef, useState} from 'react'
import './dropdown.css'
import styled from 'styled-components'
import {DropDownIcon, DropDownLess} from '@assets'


interface dropdownType {
	Options: Array<any>,
	title: string,
	name: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	defaultValue: string
}
function Dropdown({
	Options,
	title,
	name,
	onChange,
	defaultValue
}:dropdownType) {

	// 선택된 값
	const [titleValue, setTitleValue] = useState<string>(defaultValue)
	const optionRef = useRef<any>()
	const titleRef = useRef<any>()

	// 선택한 데이터를 화면에 세팅하고, input에 넣는다.
	const changeData = useCallback((e: React.MouseEvent<HTMLDivElement>, value: string): void => {
		setTitleValue(value)	// 값을 바꾸고
		optionHandler(e)		// 옵션을 닫자
	},[titleValue])

	const optionHandler = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault()
		let tmpRef = optionRef.current
		let titleTmpRef = titleRef.current
		if(tmpRef) {
			if(tmpRef.style.display === 'block') {
				tmpRef.style.display = 'none'
				titleTmpRef.style.backgroundImage = `url(${DropDownIcon})`
				titleTmpRef.style.borderBottom ='var(--inputLineWeight) solid var(--inputLineBasic)'
			} else {
				tmpRef.style.display = 'block'
				titleTmpRef.style.backgroundImage = `url(${DropDownLess})`
				titleTmpRef.style.borderBottom ='var(--inputLineWeight) solid var(--inputLineFocus)'
			}

		}
	},[titleValue])

	return (
		<div className={'dropdownArea'}>
			<div className={'inputTitle'}>{title}</div>
			<DropDownTitle onClick={optionHandler} ref={titleRef}>{titleValue}</DropDownTitle>
			<div className={'optionsArea'} ref={optionRef}>
				{
					Options?.map((data) => {
					return <div className={'options'} key={data.id} onClick={(e) => changeData(e, data.id)}>{data.title}</div>
					})
				}
			</div>
			<input type={'hidden'} name={name} defaultValue={titleValue} />
		</div>
	)
}

const DropDownTitle = styled.div`
	outline: none;
	border-bottom: var(--inputLineWeight) solid var(--inputLineBasic);
	height: var(--heightInputBasic);
	width: 100%;
	color: var(--fontUserWriteColor);
	font-size: var(--fontSizeInputText);
	padding: var(--paddingInputBasic);
	background-image: url(${DropDownIcon});
	background-repeat: no-repeat;
	background-position: 95% 60%;
	cursor: pointer;
	position: relative;
`

export default React.memo(Dropdown)
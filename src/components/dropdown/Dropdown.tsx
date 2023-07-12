import React, {useCallback, useEffect, useRef, useState} from 'react'
import './dropdown.css'
import styled from 'styled-components'
import {DropDownIcon, DropDownLess} from '@assets'


interface dropdownType {
	Options: Array<any>,
	title?: string|null,
	name: string,
	changeFunc: Function,
	defaultValue: string
}
function Dropdown({
	Options,
	title,
	name,
	changeFunc,
	defaultValue
}:dropdownType) {

	// 선택된 값
	const [titleValue, setTitleValue] = useState<string>(defaultValue)
	const optionRef = useRef<any>()
	const titleRef = useRef<any>()
	const [titleDP, setTitleDP] = useState(true)

	// 선택한 데이터를 화면에 세팅하고, input에 넣는다.
	const changeData = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string, value: string): void => {
		setTitleValue(value)			// 값을 바꾸고
		optionHandler(e)				// 옵션을 닫자
		changeFunc(e, name, id, value)	// 부모에서 실제 값을 바꾸자
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

	const closeDropDown = () => {
		let tmpRef = optionRef.current
		let titleTmpRef = titleRef.current
		tmpRef.style.display = 'none'
		titleTmpRef.style.backgroundImage = `url(${DropDownIcon})`
	}

	useEffect(() => {
		(title) ? setTitleDP(true) : setTitleDP(false)
	},[title])

	return (
		<div className={'dropdownArea'}>
			<TitleArea titledp={titleDP.toString()}>
				<div className={'inputTitle'}>{title}</div>
			</TitleArea>
			<DropDownTitle onClick={optionHandler} ref={titleRef} tabIndex={0}
						   onBlur={closeDropDown}>{titleValue}</DropDownTitle>
			<div className={'optionsArea'} ref={optionRef}>
				{
					Options?.map((data) => {
						return <div className={'options'} key={data.id} onClick={(e) => changeData(e, data.id, data.title)}>{data.title}</div>
					})
				}
			</div>
			{/*<input type={'hidden'} name={name} value={titleValue} readOnly={true} />*/}
		</div>
	)
}

type TitleType = {
	titledp?: string
}

const TitleArea = styled.div<TitleType>`
	visibility: ${props => props.titledp === 'true' ? 'visible' : 'hidden'};
	height: 2rem;
`

const DropDownTitle = styled.div`
	outline: none;
	border-bottom: var(--inputLineWeight) solid var(--inputLineBasic);
	height: var(--heightInputBasic);
	width: 100%;
	color: var(--fontUserWriteColor);
	font-size: var(--fontSizeInputText);
	padding: 1rem 1.5rem 1rem 1.5rem;
	background-image: url(${DropDownIcon});
	background-repeat: no-repeat;
	background-position: 95% 60%;
	cursor: pointer;
	position: relative;
	//border: 1px solid red;
`

export default React.memo(Dropdown)
import React, {useCallback, useEffect, useRef, useState} from 'react'
import './dropdown.css'
import styled from 'styled-components'
import {DropDownIcon, DropDownLess} from '@assets'


interface dropdownType {
	Options: Array<any>,
	name: string,
	changeFunc: Function,
	defaultValue: string
}
function Dropdown({
	Options,
	name,
  	changeFunc,
	defaultValue
}:dropdownType) {

	// 선택된 값
	const [titleValue, setTitleValue] = useState<string>()
	const optionRef = useRef<any>()
	const titleRef = useRef<any>()

	// 선택한 데이터를 화면에 세팅하고, input에 넣는다.
	const changeData = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string, value: string): void => {
		setTitleValue(value)	// 값을 바꾸고
		optionHandler(e)		// 옵션을 닫자
		changeFunc(name, id)	// 부모에서 실제 값을 바꾸자
	},[titleValue])

	const optionHandler = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault()
		let tmpRef = optionRef.current
		let titleTmpRef = titleRef.current
		if(tmpRef) {
			if(tmpRef.style.display === 'block') {
				tmpRef.style.display = 'none'
				titleTmpRef.style.backgroundImage = `url(${DropDownIcon})`
			} else {
				tmpRef.style.display = 'block'
				titleTmpRef.style.backgroundImage = `url(${DropDownLess})`
			}

		}
	},[titleValue])


	useEffect(() => {
		// 기존에 선택했던 옵션을 표시하도록 세팅한다.
		Options?.map((data) => {
			if(data.id===defaultValue) {
				setTitleValue(data.title)
			}
		})
	},[defaultValue])

	return (
		<div className={'dropdownArea'}>
			<DropDownTitle onClick={optionHandler} ref={titleRef}>{titleValue}</DropDownTitle>
			<div className={'optionsAreaForSearch'} ref={optionRef}>
				{
					Options?.map((data) => {
						return <div className={'options'} key={data.id} onClick={(e) => changeData(e, data.id, data.title)}>{data.title}</div>
					})
				}
			</div>
			{/*<input type={'text'} name={name} value={defaultValue} readOnly={true} />*/}
		</div>
	)
}

const DropDownTitle = styled.div`
	width: 13rem;
	color: var(--fontUserWriteColor);
	font-size: var(--fontSizePageSearch);
	font-weight: var(--fontWeightMiddle);
	padding: var(--paddingInputBasic);
	padding-top: 1.6rem;
	background-image: url(${DropDownIcon});
	background-repeat: no-repeat;
	background-position: 95% 60%;
	cursor: pointer;
	position: relative;
`

export default React.memo(Dropdown)
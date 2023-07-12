import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {checkbox_checked, checkbox_uncheck} from '@assets'

interface Boxtype {
	title: string,
	name: string,
	defaultFlag: boolean,
	titleType: string,
	onChangeHandler: any,
	tagRef?: MutableRefObject<any> | null
}
function CustomCheckBox({
	title,
	name,
	defaultFlag,
	titleType,
	onChangeHandler,
	tagRef
}: Boxtype) {

	const [checked, setChecked] = useState<boolean>(defaultFlag)
	// const checkRef = useRef<HTMLDivElement>(null)
	// ref가 없는 경우를 대비한다.
	const tempRef = useRef<any>()
	if(!tagRef) {
		tagRef = tempRef
	}

	const checkHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		setChecked(!checked)
		// checkbox에 강제로 이벤트를 발생시킴
		document.getElementsByName(name)[0].click()
		// console.log('!checked: ' + !checked);

		// checked state는 항상 이전 값을 반환하기 때문에.. .반대로 적용
		// if(checkRef.current) {
		// 	checkRef.current.style.backgroundImage = !checked ? `url(${checkbox_checked})` : `url(${checkbox_uncheck})`
		// }
	},[checked])

	useEffect(() => {
		if(tagRef!.current) {
			tagRef!.current.style.backgroundImage = checked ? `url(${checkbox_checked})` : `url(${checkbox_uncheck})`
		}
	},[checked])

	return (
		<CheckboxArea texttype={titleType}>
			<CheckBox onClick={checkHandler} ref={tagRef} />
			&nbsp;&nbsp;
			{title}
			<input type={'checkbox'} name={name} style={{display: 'none'}} checked={checked} onClick={onChangeHandler} readOnly />
		</CheckboxArea>
	)
}

type checkTitleType = {
	texttype: string
}

const CheckboxArea = styled.div<checkTitleType>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	${({texttype}) => {
		switch (texttype) {
			case 'loginForm':
				return css`font-size: 1.3rem; font-weight: var(--fontWeightMiddle); color: var(--fontBasicColor)`
			case 'register':
				return css`font-size: 1.6rem; font-weight: var(--fontWeightMiddle);color: var(--fontBasicColor)`
			default:
				return css`font-size: 1.3rem;`
			}
		}
	}
`

const CheckBox = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	background-image: url(${checkbox_uncheck});
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
`

export default React.memo(CustomCheckBox)
import React, {MutableRefObject, useCallback, useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {radiobox_uncheck, radiobox_checked} from '@assets'


interface RadioType {
	title: string,
	titleDP: boolean,
	optionName: Array<string>,
	name: string,
	value: Array<string>,
	defaultFlag: Array<boolean>,
	titleType: string,
	onChangeHandler: any,
	tagRef: Array<MutableRefObject<any>>
}

function CustomRadio({
	title,
	titleDP,
	optionName,
	name,
	value,
	defaultFlag,
	titleType,
	onChangeHandler,
	tagRef
}: RadioType) {

	/******************************* 페이지 세팅 **********************************/
	let tmpData: object
	let radioData: object[] = []
	let bgImageUrl: string

	for(let i = 0; i < optionName.length; i++) {
		// 배경화면 설정하고
		bgImageUrl = defaultFlag[i] ? `${radiobox_checked}` : `${radiobox_uncheck}`
		// 오브젝트 데이터 만들어주자.
		tmpData = { optionName: optionName[i], value: value[i], defaultFlag: defaultFlag[i], bgImageUrl: bgImageUrl, typeRef: tagRef[i] }
		// 실제 사용할 데이터에 세팅
		radioData = [...radioData, tmpData]
	}

	/******************************* 초기 세팅 **********************************/
	const [checked, setChecked] = useState<boolean[]>(defaultFlag)

	/******************************* 가상 Radio 핸들러 **********************************/
	const checkHandler = useCallback((e: React.MouseEvent<HTMLDivElement>, i: number, ref: React.MutableRefObject<any>) => {
		e.preventDefault()

		// 우선 현재 있는 radio를 모두 가져온다.
		const radioArray = document.getElementsByName(name)
		// 해당 radio에 클릭 이벤트를 발생시킨다.
		radioArray[i].click()

		// radio는 선택한 것만 check해야 하므로...체크한 것이 기존에 false였다면..
		if(!checked[i]) {
			// 클릭한 것의 배경을 체크로 바꾸고...
			ref.current.style.backgroundImage = `url(${radiobox_checked})`
			// 해당 checked 값을 true로 바꾸고
			checked[i] = true
			// 그 외 나머지 모든 박스의 배경은 unchecked로 바꾼다.
			for(let idx = 0; idx <tagRef.length; idx++) {
				// console.log('현재idx는', idx)
				// 이미지를 바꾸고
				tagRef[idx].current.style.backgroundImage = (tagRef[idx] !== ref) && `url(${radiobox_uncheck})`
				// 현재의 checked가 아닌 것에 false를 세팅한다.
				// checked[idx] = (idx !== i) && false
				if(idx !== i) {
					checked[idx] = false
				}
			}
			// 실제 세팅한다.
			setChecked([...checked])
		}
	},[checked])



	return (
		<>
			<TitleArea titledp={titleDP.toString()}><span className={'inputTitle'}>{title}</span></TitleArea>
			{radioData?.map((v: any, i: any) => {
				return (
					<RadioBoxArea texttype={titleType} key={i}>
						<RadioBox
							bgimageurl={v.bgImageUrl}
							ref={v.typeRef}
							onClick={(e) => checkHandler(e, i, v.typeRef)}
						/>
						<div className={'loginType'}>{v?.optionName}</div>
						<input
							type={'radio'}
							name={name}
							value={v?.value}
							style={{display: 'none'}}
							defaultChecked={v?.defaultFlag}
							onClick={onChangeHandler}
							readOnly
						/>
					</RadioBoxArea>
				)
			})}
		</>
	)
}

type RadioTitleType = {
	texttype: string
}

const RadioBoxArea = styled.div<RadioTitleType>`
	display: flex;
	justify-content: flex-start;
	align-content: center;
	flex-wrap: wrap;
	${({texttype}) => {
		switch (texttype) {
			case 'signForm':
				return css`font-size: 1.6rem; font-weight: var(--fontWeightMiddle); color: var(--fontBasicColor)`
			default:
				return css`font-size: 2rem;`
			}
		}
	}
`
type RadioBoxType = {
	bgimageurl: string
}
const RadioBox = styled.div<RadioBoxType>`
	width: 2.5rem;
	height: 2.5rem;
	background-image: url(${props => props.bgimageurl});
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	margin-bottom: 1rem;
`

type TitleType = {
	titledp: string
}
const TitleArea = styled.div<TitleType>`
	display: ${props => props.titledp === 'true' ? 'block' : 'none'};
	margin-bottom: 1.5rem;
`

export default React.memo(CustomRadio)
import React from 'react'
import styled, { css } from 'styled-components'

interface ButtonRoundType {
	title: string,
	buttontype?: string | null,
	colortype?: string | null
}


function ButtonGeneral({
	title,
	buttontype = '',
	colortype = ''
}: ButtonRoundType) {

	//  color type이 disabled라면 버튼 자체를 disabled 처리한다.
	let disabledFlag = colortype === 'disabled' && true

	return (
		<>
			<Button buttontype={buttontype} colortype={colortype} disabled={disabledFlag} >{title}</Button>
		</>
	)
}


interface btnType {
	buttontype?: string | null,
	colortype?: string | null
}

const Button = styled.button<btnType>`
	border-radius: var(--radiusBasic);
	font-weight: var(--fontWeightMiddle);
	text-align: center;	
	cursor: pointer;
	padding: var(--paddingButtonBasic);
	${({buttontype, colortype}) => {
		let tempWidth;
		let tempBgColor;
		switch (buttontype) {
			case 'full':
				tempWidth = `width: var(--widthButtonFull); height: var(--heightButtonFull); font-size: var(--fontSizeActionButton);`
				break;
			case 'large':
				tempWidth = `width: var(--widthButtonLarge); height: var(--heightButtonFull); font-size: var(--fontSizeActionButton);`
				break;
			case 'middle':
				tempWidth = `width: var(--widthButtonMiddle); height: var(--heightButtonMiddle); font-size:var(--fontSizeBasicButton);`
				break;
			case 'popup':
				tempWidth = `width: var(--widthButtonPopup); height: var(--heightButtonPopup); font-size:var(--fontSizePopupButton);`
				break;
			case 'small':
				tempWidth = `width: var(--widthButtonSmall); height: var(--heightButtonPopupSmall); font-size:var(--fontSizePopupSmallButton);`
				break;
			case 'page':
				tempWidth = `min-width: var(--widthButtonPageTop); height: var(--heightButtonPageTop); font-size:var(--fontSizeActionButton);`
				break;
			case 'file':
				tempWidth = `min-width: var(--widthButtonPageTop); height: var(--heightButtonPageTop); font-size:var(--fontSizePopupButton);`
				break;
			default:
				tempWidth = `min-width: var(--widthButtonMinBasic); height: var(--heightButtonBasic); font-size:var(--fontSizeBasicButton);`
				break;
		}
		switch (colortype) {
			case 'cancel':
				tempBgColor = `background-color:var(--bgBtnCancel); color: var(--fontBasicColor);`
				break;
			case 'disabled':
				tempBgColor = 'background-color:var(--bgBtnDisabled); color: var(--fontWhiteColor);'
				break;
			case 'sky':
				tempBgColor = 'background-color:var(--bgBtnSky); color: var(--fontWhiteColor);'
				break;
			case 'pageList':
				tempBgColor = 'background-color:var(--bgBtnList); color: var(--fontBasicColor);border: 0.05rem solid var(--borderLineBtnList);'
				break;				
			case 'file':
				tempBgColor = 'background-color:var(--bgBtnFile); color: var(--fontWhiteColor);'
				break;
			default:
				tempBgColor = `background-color: var(--bgBtnBasic); color: var(--fontWhiteColor);`
		}
		
		return css`${tempWidth} ${tempBgColor}`
	}
	
}
`

export default React.memo(ButtonGeneral);
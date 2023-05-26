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

	return (
		<>
			<Button buttontype={buttontype} colortype={colortype}>{title}</Button>
		</>
	)
}


interface btnType {
	buttontype?: string | null,
	colortype?: string | null
}

const Button = styled.button<btnType>`
	border-radius: var(--radiusBasic);
	height: var(--heightButtonFull);
	font-size: var(--fontSizeActionButton);
	font-weight: var(--fontWeightBold);
	white-space: nowrap;
	text-align: center;	
	cursor: pointer;
	${({buttontype, colortype}) => {
		let tempWidth;
		let tempBgColor;
		switch (buttontype) {
			case 'full':
				tempWidth = `width: var(--widthButtonFull);`
				break;
			case 'large':
				tempWidth = `width: var(--widthButtonLarge);`
				break;
			case 'middle':
				tempWidth = `width: var(--widthButtonMiddle);`
				break;
			default:
				tempWidth = `mid-width: var(--widthButtonMinBasic);`
				break;
		}
		switch (colortype) {
			case 'cancel':
				tempBgColor = `background-color:var(--bgBtnCancel); color: var(--fontBasicColor)`
				break;
			default:
				tempBgColor = `background-color: var(--bgBtnBasic); color: var(--fontWhiteColor)`
		}
		
		return css`${tempWidth} ${tempBgColor}`
	}
	
}
`

export default React.memo(ButtonGeneral);
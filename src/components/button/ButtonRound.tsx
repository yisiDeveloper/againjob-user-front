import React from 'react'
import styled, { css } from 'styled-components'
import {fileDelete} from '@assets'

interface ButtonRoundType {
	title: string,
	buttontype?: string|null
}

function ButtonRound({
	title,
	buttontype
}: ButtonRoundType) {

	return (
		<>
			<Button buttontype={buttontype!}>{title}</Button>
		</>
	)
}

interface btnType {
	buttontype: string
}

const Button = styled.button<btnType>`
	border-radius: var(--radiusButtonRound);
	//min-width: var(--widthButtonMinBasic);
	font-size: var(--fontSizeBasicButton);
	font-weight: var(--fontWeightMiddle);
	color: var(--fontWhiteColor);
	padding: var(--paddingButtonRound);
	white-space: nowrap;
	text-align: center;	
	cursor: pointer;
	${({buttontype}) => {
		switch (buttontype) {
			case 'small':
				return css`background-color: var(--bgBtnYellowGreen);padding: var(--paddingButtonRound);height: var(--heightButtonSmall);`
			case 'popupsmall':
				return css`background-color: var(--bgBtnCancel);padding: var(--paddingButtonRound);height: var(--heightButtonPopupSmall);color: var(--fontBasicColor);font-size:var(--fontSizePopupSmallButton)`
			case 'normal':
				return css`background-color: var(--bgBtnBasic);padding: var(--paddingButtonRound);height: var(--heightButtonBasic);`
			case 'disabled':
				return css`background-color: var(--bgBtnDisabled);padding: var(--paddingButtonRound);height: var(--heightButtonBasic);`
			case 'file':
				return css`
					height: var(--heightButtonBasic);
					background-color: var(--bgBtnBasic);
					padding: var(--paddingButtonFile);
					background-image: url(${fileDelete});
					background-repeat: no-repeat;
					background-position: 95% center;`
			case 'tag':
				return css`
					height: var(--heightButtonBasic);
					background-color: var(--bgBtnYellowGreen);
					padding: var(--paddingButtonFile);
					background-image: url(${fileDelete});
					background-repeat: no-repeat;
					background-position: 95% center;
					font-size: var(--fontSizeInputText);`
			default:
				return css`background-color: var(--bgBtnYellowGreen);padding: var(--paddingButtonRound);height: var(--heightButtonBasic);`
			}
		}
	}
`
export default React.memo(ButtonRound)
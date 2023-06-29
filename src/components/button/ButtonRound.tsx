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
	height: var(--heightButtonBasic);
	min-width: var(--widthButtonMinBasic);	
	font-size: var(--fontSizeBasicButton);
	font-weight: var(--fontWeightMiddle);
	color: var(--fontWhiteColor);
	padding: var(--paddingButtonRound);
	white-space: nowrap;
	text-align: center;	
	cursor: pointer;
	${({buttontype}) => {
		switch (buttontype) {
			case 'normal':
				return css`background-color: var(--bgBtnBasic);padding: var(--paddingButtonRound);`
			case 'disabled':
				return css`background-color: var(--bgBtnDisabled);padding: var(--paddingButtonRound);`
			case 'file':
				return css`
					background-color: var(--bgBtnBasic);
					padding: var(--paddingButtonFile);
					background-image: url(${fileDelete});
					background-repeat: no-repeat;
					background-position: 95% center;`
			default:
				return css`background-color: var(--bgBtnYellowGreen);padding: var(--paddingButtonRound);`
			}
		}
	}
`
export default React.memo(ButtonRound)
import React from 'react'
import styled, { css } from 'styled-components'

interface ButtonRoundType {
	title: string,
	buttontype?: string|null
}

function ButtonRound({
	title,
	buttontype = ''
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
	${({buttontype}) =>
		buttontype==='normal'
			? css`
			background-color: var(--bgBtnBasic);
			`
			: css`
			background-color: var(--bgBtnYellowGreen);
			`
	}
`
export default React.memo(ButtonRound)
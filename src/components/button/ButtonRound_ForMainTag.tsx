import React from 'react'
import styled, {css} from 'styled-components'

interface ButtonRoundType {
	title: string,
	buttontype: string		// focus or normal
}

function ButtonRound_ForMainTag({
	title,
	buttontype
}: ButtonRoundType) {

	return (
		<>
			<Button buttontype={buttontype}>{title}</Button>
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
	font-weight: var(--fontWeightBold);
	padding: var(--paddingButtonRound);
	background-color: var(--bgContentBasicBgColor);
	white-space: nowrap;
	text-align: center;
	cursor: pointer;
	margin-left: 1.5rem;
	${({buttontype}) =>
		buttontype==='normal'
			? css`
			border: 0.05rem solid #BAC9D1;
			color: var(--fontBasicColor);
			`
			: css`
			border: 0.05rem solid var(--bgBtnYellowGreen);
			color: #9ACA40;
			`
	}
`
export default React.memo(ButtonRound_ForMainTag)
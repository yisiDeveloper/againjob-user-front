import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'

interface ButtonRoundType {
	title: string,
	buttontype: string		// focus or normal
}

function IconRound_ForMain({
   title,
   buttontype
}: ButtonRoundType) {

	const [bgColor, setBgColor] = useState<string>('')
	const [fontColor, setFontColor] = useState<string>('')
	const [border, setBorder] = useState<string>('')

	useEffect(() => {
		switch (buttontype) {
			case 'focus':
				setBgColor('#FD7037')
				setFontColor('#FFF')
				setBorder('0')
				break
			case 'work':
				setBgColor('#9ACA40')
				setFontColor('#FFF')
				setBorder('0')
				break
			case 'talent':
				setBgColor('#FFF')
				setFontColor('#798F9A')
				setBorder('1px solid #00A9E8')
				break
			case 'sky':
				setBgColor('#00A9E8')
				setFontColor('#FFF')
				setBorder('0')
				break
			default:
				setBgColor('#EEF2F4')
				setFontColor('#414550')
				setBorder('0')
				break
		}
	},[])

	return (
		<>
			<Button fontcolor={fontColor} bgcolor={bgColor} borderstyle={border}>{title}</Button>
		</>
	)
}


interface btnType {
	fontcolor: string,
	bgcolor: string,
	borderstyle: string
}

const Button = styled.button<btnType>`
	border-radius: var(--radiusButtonRound);
	height: 2.5rem;
	font-size: 1.2rem;
	font-weight: var(--fontWeightMiddle);
	padding: 0 1.5rem 0 1.5rem;
	text-align: center;
	border: ${(props) => props.borderstyle};
	color: ${(props) => props.fontcolor};
	background-color: ${(props) => props.bgcolor};
}
`
export default React.memo(IconRound_ForMain)
import React from 'react'
import styled from 'styled-components'


interface TitleType {
	title: string
}

function RegistLoginTitle({
	title
}:TitleType) {

	return (
		<TitleStyle>
			{title}
		</TitleStyle>
	)
}

const TitleStyle = styled.div`
	font-size: var(--fontSizeRegistLoginPageTitle);
	color: var(--fontBasicColor);
	text-align: center;
	font-weight: var(--fontWeightBold);
)
`
export default React.memo(RegistLoginTitle)
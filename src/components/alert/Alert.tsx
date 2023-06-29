import React, {MutableRefObject} from 'react'
import styled, {css} from 'styled-components'


interface AlertType {
	title?: string | null,
	alertdisplay: boolean,
	alertRef?: MutableRefObject<any> | null,
	alertStyle?: string | null
}

function Alert({
	title,
	alertdisplay = false,
	alertRef,
	alertStyle
}: AlertType) {

	return (
		<AlertBox ref={alertRef} alertstyle={alertStyle} alertdisplay={alertdisplay.toString()}>
			{title}
		</AlertBox>
	)
}

interface boxType {
	alertstyle?:string | null,
	alertdisplay: string
}

const AlertBox = styled.div<boxType>`
	color: var(--fontInputAlertColor);
	font-size: var(--fontSizeInputAlert);
	font-weight: var(--fontWeightBold);
	padding-left: 0.8rem;
	margin-top: 0.5rem;
	display: ${props => props.alertdisplay === 'true' ? 'block' : 'none'};
	${({alertstyle}) => {
		return css`${alertstyle}`
		}
	}
`

export default React.memo(Alert)
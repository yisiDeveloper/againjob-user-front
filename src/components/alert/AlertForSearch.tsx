import React, {MutableRefObject} from 'react'
import styled, {css} from 'styled-components'


interface AlertType {
	title?: string | null,
	alertdisplay: boolean,
	alertRef?: MutableRefObject<any> | null,
	alertStyle?: string | null
}

function AlertForSearch({
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
	font-size: 1.2rem;
	padding-left: 4.8rem;
	margin-top: -1.0rem;
	display: ${props => props.alertdisplay === 'true' ? 'block' : 'none'};
	${({alertstyle}) => {
		return css`${alertstyle}`
		}
	}
`

export default React.memo(AlertForSearch)
import React, {useState} from 'react'
import {popup_CLoseButton} from '@assets'
import styled from 'styled-components'
import {ButtonGeneral} from '@components'
import './alert.css'


interface PopupProps {
	popMsg: any,
	okFunc: (e: React.MouseEvent) => void,
	cancelFunc?: (e: React.MouseEvent) => void | null,
	bgFunc: (e: React.MouseEvent) => void,
	popupType?: string | null
}

function Popup({
   popMsg,
   okFunc,
   cancelFunc,
   bgFunc,
   popupType
}: PopupProps) {

	let tempMargin = window.innerHeight
	tempMargin = (tempMargin-250)/2
	const [topMargin,] = useState(tempMargin)

	return (
		<>
			<PopWrap topmargin={topMargin}>
				<div className={'popTitleArea'}>
					<div className={'popTitle'}>{popMsg.title}</div>
					<p className={'popClose'} onClick={bgFunc} >
						<img src={popup_CLoseButton} alt='close '/>
					</p>
				</div>
				<div className={'p opContent'}>
					{popMsg.message}
				</div>
				<div style={{textAlign: 'center'}}>
				{popupType==='confirm' &&
					<span onClick={cancelFunc} style={{marginRight: '2rem'}}>
						<ButtonGeneral title='취소' buttontype={'popup'} colortype={'cancel'} />
					</span>
				}
					<span onClick={okFunc}>
						<ButtonGeneral title='확인' buttontype={'popup'}  />
					</span>
				</div>
			</PopWrap>
			<div className={'comBG'} onClick={bgFunc} />
		</>
	)
}
type wrapType = {
	topmargin: number
}

const PopWrap = styled.section<wrapType>`
	min-width: var(--widthPopupMin);
	max-width: var(--widthPopupMax);
	min-height: var(--heightPopupMin);
	border-radius: var(--radiusBasic);
	background-color: #fff;
	z-index: 100;
	//position: absolute;
	position: fixed;
	display: flex;
	top: ${props => props.topmargin}px;
	flex-direction: column;
	padding: 2.8rem;
`

export default React.memo(Popup)
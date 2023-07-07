import React, {useRef} from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode';
import {popup_CLoseButton} from '@assets'
import styled from 'styled-components'

interface PopupProps {
	okFunc: (valueName: string, value: any, errorValue: boolean) => void,
	bgFunc: (e: React.MouseEvent) => void,
	valueName: string
}
function AddressSearch({
	okFunc,
	bgFunc,
	valueName
}: PopupProps) {

	const popRef = useRef<any>();

	const handleComplete = (data: any) => {

		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		okFunc(valueName, fullAddress, false)
		popRef.current.click()
	};

	return (
		<>
			<PopWrap>
				<div className={'popTitleArea'}>
					<div className={'popTitle'}>주소검색</div>
					<p className={'popClose'} onClick={bgFunc} ref={popRef}>
						<img src={popup_CLoseButton} alt='close '/>
					</p>
				</div>
				{/*<div style={{height: '3rem'}} />*/}
				<div className={'popContent'}>
					<DaumPostcodeEmbed onComplete={handleComplete} />
				</div>
			</PopWrap>
			<div className={'comBG'} onClick={bgFunc}/>
		</>
	)
}

const PopWrap = styled.section`
	width: 45rem;
	min-height: var(--heightPopupMin);
	border-radius: var(--radiusBasic);
	background-color: #fff;
	z-index: 100;
	position: absolute;
	//position: fixed;
	display: flex;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	flex-direction: column;
	padding: 2.8rem;
`
export default React.memo(AddressSearch)
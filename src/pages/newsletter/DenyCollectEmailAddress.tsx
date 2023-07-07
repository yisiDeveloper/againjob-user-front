import React from 'react'
import {PageTitle} from '@components'
import './newsletter.css'

interface popPropType {
	// bgFunc: (e: React.MouseEvent) => void,
	closeSetter: React.Dispatch<React.SetStateAction<boolean>>
}
function DenyCollectEmailAddress({
	 closeSetter
 }: popPropType) {

	/****************************************************** Page 정의 ***************************************************/
	// let tempMargin = window.innerHeight
	// tempMargin = (tempMargin-250)/2
	// const [topMargin,] = useState(tempMargin)

	return (
		<>
			<section className={'newsletterPopupWrap'} style={{width: '50rem'}}>
				<div className={'contentPopupHead'}>
					<div className={'contentPopupTitle'}><PageTitle title={'이메일무단수집거부'} /></div>
					<div onClick={() => closeSetter(false)} className={'contentPopupClose'}></div>
				</div>
				<article className={'contentPopupContent'}>
					<p style={{fontSize: '2rem'}}>
						AgainJob은 회원님의 개인정보를 안전하게 보호하기 위해 최선을 다하고 있습니다.
					</p>
					<br />
					<p>
						AgainJob 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖을 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를 위반 시 정보통신망법에 의해 형사처벌 됨을 유념하시기 바랍니다.
					</p>
				</article>
			</section>
			<div className={'comBG'} onClick={() => closeSetter(false)} />
		</>
	)
}


export default React.memo(DenyCollectEmailAddress)
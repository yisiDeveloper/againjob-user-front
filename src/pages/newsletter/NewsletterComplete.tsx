import React from 'react'
import {ButtonGeneral, PageTitle} from '@components'

interface NewsletterPropType {
	action: string,
	closeSetter: React.Dispatch<React.SetStateAction<boolean>>
	// closeSetter: React.Dispatch<React.SetStateAction<boolean>>
}

function Newsletter({
	action,
	closeSetter
}: NewsletterPropType) {

	/****************************************************** Handling ***************************************************/
	let content:string
	if(action === 'denied') {
		content = '뉴스레터 해지가 완료됐습니다.\n언제든 다시 신청하실 수 있습니다.'
	} else if(action === 'register') {
		content = '뉴스레터 등록이 완료됐습니다.\n \n최고의 정보를 가장 빠르게 제공해드리도록 노력하겠습니다.'
	}

	return (
		<>
			<section className={'contentPopupWrap'} style={{width: '50rem'}}>
				<div className={'contentPopupHead'}>
					<div className={'contentPopupTitle'}><PageTitle title={'뉴스레터 신청'} /></div>
					<div onClick={() => closeSetter(false)} className={'contentPopupClose'}></div>
				</div>
				<article className={'contentPopupContent'}>
					<div style={{fontSize:'1.8rem'}}>
						{content!}
					</div>
					<div className={'emptyDivHeight'} />
					<div style={{textAlign:'center'}} onClick={() => closeSetter(false)}>
						<ButtonGeneral
							title={'확인'}
							buttontype={'middle'}
						/>
					</div>
				</article>
			</section>
			<div className={'comBG'} onClick={() => closeSetter(false)} />
		</>
	)
}

export default React.memo(Newsletter)
import React, {useCallback} from 'react'
import './layout.css'

function Footer() {

	/****************************************************** 버튼, 링크 ***************************************************/
	const goNewsletter = useCallback(() => {
		alert('뉴스레터를 신청합니다.')
	},[])

	return (
		<footer className={'footerContainer'}>
			<div className={'footerWrap'}>
				<div className={'ciWrap'}>AgainJob</div>
				<div className={'footerContentWrap'}>
					<div className={'footerMenuWrap'}>
						<div className={'footerMenu'}>개인정보처리방침</div>
						<div className={'footerMenuBar'} />
						<div className={'footerMenu'}>이용약관</div>
						<div className={'footerMenuBar'} />
						<div className={'footerMenu'}>이메일무단수집거부</div>
					</div>
					<div className={'footerInfo'} style={{color: '#798F9A'}}>
						이시&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;서울특별시 구로구 디지털로26길 111, JNK디지털타워 1707호
					</div>
					<div className={'footerInfo'} style={{color: '#414550'}}>
						COPYRIGHT 2023 YISI ALL RIGHTS RESERVED
					</div>
				</div>
				<div className={'newsletterWrap'}>
					<button className={'newsletterButton'} onClick={goNewsletter}>뉴스레터 신청하기</button>
				</div>
			</div>
		</footer>
	)
}

export default React.memo(Footer)
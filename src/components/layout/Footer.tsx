import React, {useCallback, useState} from 'react'
import './layout.css'
import {pageURL_Policy_Privacy, pageURL_Policy_Service} from '@env'
import {DenyCollectEmailAddress, Newsletter, NewsletterComplete} from '@pages'
import {useNavigation} from '@hook'

function Footer() {

	/****************************************************** 공통 정의 ***************************************************/
	const {goToURL} = useNavigation()

	/****************************************************** 페이지 정의 ***************************************************/
	// 팝업 display를 세팅
	const [popDP, setPopDP] = useState<boolean>(false)
	// 팝업 element를 세팅
	const [popupElement, setPopupElement] = useState<React.ReactElement>()

	/****************************************************** Handling ***************************************************/
	const popOpen = useCallback((e: React.SyntheticEvent, content:string) => {
		e.preventDefault()
		if(content==='newsletter') {
			setPopupElement(<Newsletter closeSetter={setPopDP} okFunc={newsletterDone} />)
			setPopDP(true)
		} else if(content==='deniedEmail') {
			setPopupElement(<DenyCollectEmailAddress closeSetter={setPopDP} />)
			setPopDP(true)
		} else {
			setPopDP(false)
		}
	},[popDP, popupElement])

	// 뉴스레터 등록/해지 완료 페이지
	const newsletterDone = useCallback((e: React.SyntheticEvent, action: string) => {
		e.preventDefault()
		console.log('action', action)
		setPopupElement(<NewsletterComplete closeSetter={setPopDP} action={action} />)
		setPopDP(true)
	},[])


	return (
		<footer className={'footerContainer'}>
			<div className={'footerWrap'}>
				<div className={'ciWrap'}>AgainJob</div>
				<div className={'footerContentWrap'}>
					<div className={'footerMenuWrap'}>
						<div className={'footerMenu'} onClick={(e) => {goToURL(e, pageURL_Policy_Privacy)}}>개인정보처리방침</div>
						<div className={'footerMenuBar'} />
						<div className={'footerMenu'} onClick={(e) => {goToURL(e, pageURL_Policy_Service)}}>이용약관</div>
						<div className={'footerMenuBar'} />
						<div onClick={(e) => popOpen(e, 'deniedEmail')} className={'footerMenu'}>이메일무단수집거부</div>
					</div>
					<div className={'footerInfo'} style={{color: '#798F9A'}}>
						이시&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;서울특별시 구로구 디지털로26길 111, JNK디지털타워 1707호
					</div>
					<div className={'footerInfo'} style={{color: '#414550'}}>
						COPYRIGHT 2023 YISI ALL RIGHTS RESERVED
					</div>
				</div>
				<div className={'newsletterWrap'}>
					<button className={'newsletterButton'} onClick={(e) => popOpen(e, 'newsletter')}>뉴스레터 신청하기</button>
				</div>
			</div>
			{popDP && popupElement}
		</footer>
	)
}

export default React.memo(Footer)
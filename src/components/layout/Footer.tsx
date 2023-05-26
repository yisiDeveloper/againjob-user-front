import React, {useCallback} from 'react'
import styled from 'styled-components'

function Footer() {

	/****************************************************** 버튼, 링크 ***************************************************/
	const goNewsletter = useCallback(() => {
		alert('newsletter')
	},[])

	return (
		<FooterContainer>
			<FooterWrap>
				<CIWrap>AgainJob</CIWrap>
				<FooterContentWrap>
					<FooterMenuWrap>
						<FooterMenu>개인정보처리방침</FooterMenu>
						<FooterMenuBar />
						<FooterMenu>이용약관</FooterMenu>
						<FooterMenuBar />
						<FooterMenu>이메일무단수집거부</FooterMenu>
					</FooterMenuWrap>
					<FooterInfo style={{color: '#798F9A'}}>
						이시&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;서울특별시 구로구 디지털로26길 111, JNK디지털타워 1707호
					</FooterInfo>
					<FooterInfo style={{color: '#414550'}}>
						COPYRIGHT 2023 YISI ALL RIGHTS RESERVED
					</FooterInfo>
				</FooterContentWrap>
				<NewsletterWrap>
					<NewsletterButton onClick={goNewsletter}>뉴스레터 신청하기</NewsletterButton>
				</NewsletterWrap>
			</FooterWrap>
		</FooterContainer>
	)
}


const FooterContainer = styled.footer`
	width: 100%;
	height: 15rem;
	background-color: #fff;
	//border-top: 1px solid #BAC9D1;
	display: flex;
	justify-content: center;
`

const FooterWrap = styled.div`
	width: var(--comContainerSize);
	display: flex;
	justify-content: flex-start;
	//border: 1px solid red;
`

const CIWrap = styled.div`
	width: 18rem;
	display: flex;
	padding-left: 1rem;
	font-size: 2rem;
	font-weight: bold;
	color: var(--fontBasicColor);
	align-items: center;
	//border: 1px solid dodgerblue;
`

const FooterContentWrap = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	//border: 1px solid darkolivegreen;
`

const FooterMenuWrap = styled.div`
	display: flex;
	//border: 1px solid darkolivegreen;
	margin-top: 4rem;
	margin-bottom: 3rem;
	align-items: center;
	
`

const FooterMenu = styled.div`
	font-size: var(--fontSizeFooterText);
	font-weight: var(--fontWeightMiddle);
	color: #798F9A;
`

const FooterMenuBar = styled.div`
	width: 0.01rem;
	background-color: #798F9A;
	height: 1rem;
	margin-right: 1.5rem;
	margin-left: 1.5rem;
`

const FooterInfo = styled.div`
	width: 100%;
	font-size: var(--fontSizeFooterText);
	font-weight: var(--fontWeightBasic);
	//border: 1px solid red;
	line-height: 1;
	padding-bottom: 1rem;
	
`
const NewsletterWrap = styled.div`
	width: 25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	//border: 1px solid yellowgreen;
`

const NewsletterButton = styled.button`
	border-radius: 2rem;
	width: 14.6rem;
	height: 3.8rem;
	color: #fff;
	background-color: #45AD70;
	text-align: center;
	font-size: 1.2rem;
	font-weight: var(--fontWeightMiddle);
	cursor: pointer;
`
export default React.memo(Footer)
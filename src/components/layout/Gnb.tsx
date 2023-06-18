import React, {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {
	ButtonCloseWhiteLarge,
	ButtonSubMenuOpen,
	ButtonSubMenuClose
} from '@assets'
import {contentStore, memberStore} from '@service'
import {ButtonRound} from '@components'
import {
	pageURL_Sign_Login,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_PE_FindID,
	pageURL_Sign_PE_FindPwd
} from '@env'
import {goToURL} from '@handler'


function Gnb() {

	/************************************************ Global store state *********************************************/
	const {
		memberNumber, setMemberNumber,			// 회원번호
		memberId, setMemberId,					// 회원아이디
		memberType, setMemberType				// 회원 타입 (0: 기업, 1: 개인)
	} = memberStore(state => state)

	const {
		// Submenu 노출여부
		subMenu, setSubMenu						// true(default): open, false: close
	} = contentStore(state => state)


	/****************************************************** 공통 정의 ***************************************************/
	const navigate = useNavigate()
	// 최상단 광고 팝업 창의 노출여부
	const [adDP, setAdDP] = useState<boolean>(false)
	// Sub menu 노출 여부, 나중에는 Local Storage 또는 Global Store에 저장해 놓고 써야 할 듯

	const location = useLocation()
	// console.log('gnb location', location.state)



	/****************************************************** 메뉴 관련 ***************************************************/
	const subMenuHandler = useCallback(() => {
		// 아이콘을 변경하고, 메뉴를 open/close하기 위한 세팅을 한다.
		setSubMenu(!subMenu)
	},[subMenu])


	/****************************************************** 버튼, 링크 ***************************************************/

	/*		close button action		*/
	const closeAd = useCallback(() => {
		setAdDP(false)
		// alert('광고/공지사항을 닫습니다.');
	},[adDP])

	// test를 위한 임시 세팅
	useEffect(() => {
		// setMemberNumber('')
		// setMemberId('yisiStory')
		// setMemberType('')
		setAdDP(false)
		// setSubMenu(false)
	},[])


	return (
		<>
			{/************************************** 	광고/공지사항 영역		**************************************/}
			<AdWrap wrapdisplay={adDP?.toString()}>
				<AdContentarea>
					AgainJob Grand Open Event 2023-07-01 ~ 2023-08-31
				</AdContentarea>
				<AdContentCloseButton>
					<CloseButton onClick={closeAd} />
				</AdContentCloseButton>
			</AdWrap>

			{/**************************************		GNB 영역		**************************************/}
			<GnbArea>
				<GnbWrap>
					<CIWrap><span onClick={(e) => goToURL(e, '/', navigate)} style={{cursor: 'pointer'}}>AgainJob</span></CIWrap>
					<MenuWrap>
						<EachMenuWrap rightmargin='7rem'>채용정보</EachMenuWrap>
						<EachMenuWrap rightmargin='7rem'>인재정보</EachMenuWrap>
						<EachMenuWrap rightmargin='7rem'>일거리정보</EachMenuWrap>
						<EachMenuWrap rightmargin='4.6rem'>고객센터</EachMenuWrap>
						<MenuBar rightmargin='4.6rem' />
						{memberType==='0' ?
							<><EachMenuWrap rightmargin='7rem'>공고관리</EachMenuWrap><EachMenuWrap rightmargin='4.5rem'>일거리관리</EachMenuWrap></>
						 :
						<><EachMenuWrap rightmargin='7rem'>지원관리</EachMenuWrap><EachMenuWrap rightmargin='4.5rem'>참여관리</EachMenuWrap></>
					}
					</MenuWrap>
					<SubMenuIconWrap>
						<SubMenuButton submenu={subMenu?.toString()} onClick={subMenuHandler} />
					</SubMenuIconWrap>
				</GnbWrap>
			</GnbArea>
			<SubArea subdisplay={subMenu?.toString()}>
				<SubWrap>
					{/*****************	로그인 전 *****************/}
					{(memberNumber == '') &&
					<>
						<SubInfoText>휴대전화번호로 회원 가입이 가능합니다. 회원가입 후 다양한 서비스를 받아보세요.</SubInfoText>
						<SearchMyInfo onClick={(e) => goToURL(e,pageURL_Sign_PE_FindID, navigate)}>아이디찾기</SearchMyInfo>
						<SubMenuBar />
						<SearchMyInfo onClick={(e) => goToURL(e,pageURL_Sign_PE_FindPwd, navigate)}>비밀번호 찾기</SearchMyInfo>
						<SubButtonArea onClick={(e) => goToURL(e,pageURL_Sign_ChoiceClassify, navigate)}>
							<ButtonRound title='회원가입' buttontype='special' />
						</SubButtonArea>
						<SubButtonArea onClick={(e) => goToURL(e, pageURL_Sign_Login, navigate)} style={{marginRight:'25px'}}>
							<ButtonRound title='로그인' buttontype='normal' />
						</SubButtonArea>
					</>}
					{/*****************	로그인 후: 개인 *****************/}
					{(memberType === '1') &&
					<>
						<SubMenuPeople style={{marginLeft: '23.5rem'}}>내 정보</SubMenuPeople>
						<SubMenuPeople>이력서관리</SubMenuPeople>
						<SubMenuPeople>받은요청</SubMenuPeople>
						<SubMenuPeople>평가관리</SubMenuPeople>
						<SubMenuPeople>결제내역</SubMenuPeople>
						<SubMenuPeople>이용권</SubMenuPeople>
						<SubButtonArea onClick={() => alert('로그아웃')}>
							<ButtonRound title='로그아웃' buttontype='normal' />
						</SubButtonArea>
					</>}
					{(memberType === '0') &&
					<>
						{/*****************	로그인 후: 기업 *****************/}
						<SubMenuPeople style={{marginLeft: '23.5rem'}}>기업정보</SubMenuPeople>
						<SubMenuPeople>지원요청</SubMenuPeople>
						<SubMenuPeople>참여요청</SubMenuPeople>
						<SubMenuPeople>평가관리</SubMenuPeople>
						<SubMenuPeople>결제내역</SubMenuPeople>
						<SubMenuPeople>이용권</SubMenuPeople>
						<SubButtonArea onClick={() => alert('로그아웃')}>
							<ButtonRound title='로그아웃' buttontype='normal' />
						</SubButtonArea>
					</>}
				</SubWrap>
			</SubArea>
		</>
	)
}

/****************************************** GNB 영역 **********************************************/
const GnbArea = styled.nav`
	width: 100%;
	height: 6.5rem;
	background-color: var(--comMainColor);
	display: flex;
	justify-content: center;
	align-content: center;
`

const GnbWrap = styled.div`
	width: var(--comContainerSize);
	display: flex;
	justify-content: flex-start; 
`

const CIWrap = styled.div`
	width: 22rem;
	height: 100%;
	font-size: 2rem;
	color: #fff;
	padding-left: 3rem;
	padding-top: 1.5rem;
	//border: 1px solid yellow;
`

const MenuWrap = styled.div`
	width: 84rem;
	height: 100%;
	//border: 1px solid orange;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

type menuRightMargin = {
	rightmargin: string|null
}
const EachMenuWrap = styled.span<menuRightMargin>`
	//border: 1px solid red;
	margin-right: ${(props) => props.rightmargin};
	vertical-align: bottom;
	color: var(--fontWhiteColor);
	font-weight: var(--fontWeightMiddle);
	font-size: var(--fontSizeGnb);
`

const MenuBar = styled.div<menuRightMargin>`
	width: 0.05rem;
	height: 1.5rem;
	background-color: #F6F2EE;
	margin-right: ${props => props.rightmargin};
`
const SubMenuIconWrap = styled.div`
	width: 8rem;
	height: 100%;
	//border: 1px solid blue;
	display: flex;
	justify-content: center;
	align-items: center;
`

type subMenuType = {
	submenu: string
}
const SubMenuButton = styled.button<subMenuType>`
	width: 3rem;
	height: 5rem;
	background-image: url(${(props) => props.submenu==='true' ? ButtonSubMenuClose : ButtonSubMenuOpen});
	background-repeat: no-repeat;
	background-position: center;
	background-color: transparent;
	cursor: pointer;
`


/****************************************** Sub 영역 공통 **********************************************/
type subDisplayType = {
	subdisplay: string
}
const SubArea = styled.div<subDisplayType>`
	width: 100%;
	height: 5rem;
	background-color: #FFF;
	display: ${(props) => props.subdisplay==='true' ? 'flex' : 'none'};
	justify-content: center;
	align-content: center;
`

const SubWrap = styled.div`
	width: var(--comContainerSize);
	//border: 1px solid dodgerblue;
	height: 5rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

/****************************************** Sub 영역 로그인 전 **********************************************/
// 로그인 전 안내문구
const SubInfoText = styled.div`
	font-size: 1.4rem;
	color: var(--fontBasicColor);
	font-weight: var(--fontWeightBold);
	padding-left: 4.5rem;
	flex-grow: 1;
`

// 로그인 전 아이디 찾기, 비밀번호 찾기
const SearchMyInfo = styled.div`
	font-size: 1.2rem;
	color: var(--fontBasicColor);
	font-weight: var(--fontWeightBold);
	margin-right: 2rem;
	cursor: pointer;
`

// 로그인 전 아이디 찾기 옆 세로라인
const SubMenuBar = styled.div`
	width: 0.05rem;
	height: 1rem;
	background-color: #BAC9D1;
	margin-right: 2rem;
`
const SubButtonArea = styled.div`
	margin-right: 1.5rem;
	cursor: pointer;
`

/****************************************** Sub 영역 개인 **********************************************/
const SubMenuPeople = styled.div`
	font-size: var(--fontSizeSub);
	font-weight: var(--fontWeightBold);
	color: var(--fontBasicColor);
	margin-right: var(--marginRightSubMenu);
	white-space: nowrap;
`

/****************************************** Sub 영역 기업 **********************************************/

/****************************************** 배너/중요 공지사항 영역 **********************************************/
type WrapDisplayType = {
	wrapdisplay: string
}

const AdWrap = styled.div<WrapDisplayType>`
	width: 100%;
	background-color: var(--bgAdareaColor);
	height: 10rem;
	display: ${(props) => props.wrapdisplay==='true' ? 'flex' : 'none'};
	justify-content: center;
`

/* 배너/중요 공지사항의 컨텐츠 영역 */
const AdContentarea = styled.div`
	width: calc(var(--comContainerSize) - 8rem);
	height: 100%;
	//border: 1px solid red;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--fontWhiteColor);
	font-size: 30px;
`

/* 배너/중요 공지사항의 close button */
const AdContentCloseButton = styled.div`
	width: 10rem;
	display: flex;
	justify-content: center;
	align-items: center;
`

const CloseButton = styled.button`
	width: 4rem;
	height: 4rem;
	cursor: pointer;
	//border: 1px solid red;
	background-image: url(${ButtonCloseWhiteLarge});
	background-color: transparent;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
`

export default React.memo(Gnb)
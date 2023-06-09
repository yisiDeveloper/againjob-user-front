import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {
	ButtonCloseWhiteLarge,
	ButtonSubMenuOpen,
	ButtonSubMenuClose
} from '@assets'
import {contentStore} from '@service'
import {ButtonRound} from '@components'
import {
	pageURL_Sign_Login,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_PE_FindID, pageURL_Sign_PE_FindPwd,
	pageURL_CS_NoticeList,
	pageURL_Member_PE_DetailInfo, pageURL_Member_CO_DetailInfo,
	pageURL_Resume_List, pageURL_Apply_List, pageURL_Involve_List,
	authFlagName, memberTypeName, memberTypeCorp, memberTypePersonal,
	pageURL_Request_List
} from '@env'
import './layout.css'
import {useNavigation} from '@hook'
import {getSessionItem, removeAllSessionItem} from '@handler'

function Gnb() {

	/************************************************ Global store state *********************************************/
	const {
		// Submenu 노출여부
		subMenu, setSubMenu						// true(default): open, false: close
	} = contentStore()
	// 	contentStore(state => state)
	const memberType = getSessionItem(memberTypeName)
	const authFlag = getSessionItem(authFlagName)


	const {goToURL ,navigate} = useNavigation()
	/****************************************************** 공통 정의 ***************************************************/
	// 최상단 광고 팝업 창의 노출여부
	const [adDP, setAdDP] = useState<boolean>(true)
	// Sub menu 노출 여부, 나중에는 Local Storage 또는 Global Store에 저장해 놓고 써야 할 듯


	/****************************************************** 메뉴 관련 ***************************************************/
	const subMenuHandler = useCallback(() => {
		// 아이콘을 변경하고, 메뉴를 open/close하기 위한 세팅을 한다.
		setSubMenu(!subMenu)
	},[subMenu])

	const goLogOut = useCallback((e: React.SyntheticEvent) => {
		// e.preventDefault()
		alert('로그아웃 하겠습니다.')
		removeAllSessionItem()
		navigate('/', {replace: true})
	},[])


	/****************************************************** 버튼, 링크 ***************************************************/
	/*		close button action		*/
	const closeAd = useCallback(() => {
		setAdDP(false)
		// alert('광고/공지사항을 닫습니다.');
	},[adDP])

	// test를 위한 임시 세팅
	useEffect(() => {

	},[])

	return (
		<>
			{/************************************** 	광고/공지사항 영역		**************************************/}
			<AdWrap wrapdisplay={adDP?.toString()}>
				<div className={'adContentarea'}>
					AgainJob Grand Open Event 2023-07-01 ~ 2023-08-31
				</div>
				<div className={'adContentCloseButton'}>
					<CloseButton onClick={closeAd} />
				</div>
			</AdWrap>
			{/**************************************		GNB 영역		**************************************/}
			<nav className={'gnbArea'}>
				<div className={'gnbWrap'}>
					<div className={'cIWrap'}><span onClick={(e) => goToURL(e, '/')} style={{cursor: 'pointer'}}>AgainJob</span></div>
					<div className={'MenuWrap'}>
						<EachMenuWrap rightmargin='7rem'>채용정보</EachMenuWrap>
						<EachMenuWrap rightmargin='7rem'>인재정보</EachMenuWrap>
						<EachMenuWrap rightmargin='7rem'>일거리정보</EachMenuWrap>
						<EachMenuWrap rightmargin='4.6rem' onClick={(e) => goToURL(e, pageURL_CS_NoticeList)}>고객센터</EachMenuWrap>
						<MenuBar rightmargin='4.6rem' />
						{memberType==='0' ?
							<><EachMenuWrap rightmargin='7rem'>공고관리</EachMenuWrap><EachMenuWrap rightmargin='4.5rem'>일거리관리</EachMenuWrap></>
						 :
						<><EachMenuWrap rightmargin='7rem' onClick={(e) => goToURL(e, pageURL_Apply_List)}>지원관리</EachMenuWrap><EachMenuWrap rightmargin='4.5rem' onClick={(e) => goToURL(e, pageURL_Involve_List)}>참여관리</EachMenuWrap></>
					}
					</div>
					<div className={'subMenuIconWrap'}>
						<SubMenuButton submenu={subMenu?.toString()} onClick={subMenuHandler} />
					</div>
				</div>
			</nav>
			<SubArea subdisplay={subMenu?.toString()}>
				<div className={'subWrap'}>
					{/*****************	로그인 전 *****************/}
					{(!authFlag) &&
						<>
							<div className={'subInfoText'} >휴대전화번호로 회원 가입이 가능합니다. 회원가입 후 다양한 서비스를 받아보세요.</div>
							<div className={'searchMyInfo'} onClick={(e) => goToURL(e,pageURL_Sign_PE_FindID)}>아이디찾기</div>
							<div className={'subMenuBar'} />
							<div className={'searchMyInfo'} onClick={(e) => goToURL(e,pageURL_Sign_PE_FindPwd)}>비밀번호 찾기</div>
							<div className={'subButtonArea'} onClick={(e) => goToURL(e,pageURL_Sign_ChoiceClassify)}>
								<ButtonRound title='회원가입' buttontype='special' />
							</div>
							<div className={'subButtonArea'} onClick={(e) => goToURL(e, pageURL_Sign_Login)} style={{marginRight:'25px'}}>
								<ButtonRound title='로그인' buttontype='small' />
							</div>
						</>
					}
					{/*****************	로그인 후: 개인 *****************/}
					{(memberType === memberTypePersonal) &&
						<>
							<div className={'subMenuPeople'} style={{marginLeft: '23.5rem'}} onClick={(e) => goToURL(e, pageURL_Member_PE_DetailInfo)}>내 정보</div>
							<div className={'subMenuPeople'} onClick={(e) => goToURL(e, pageURL_Resume_List)}>이력서관리</div>
							<div className={'subMenuPeople'} onClick={(e) => goToURL(e, pageURL_Request_List)}>받은요청</div>
							<div className={'subMenuPeople'}>평가관리</div>
							<div className={'subMenuPeople'}>결제내역</div>
							<div className={'subMenuPeople'}>이용권</div>
							<div className={'subButtonArea'} onClick={goLogOut}>
								<ButtonRound title='로그아웃' buttontype='small' />
							</div>
						</>}
					{(memberType === memberTypeCorp) &&
						<>
							{/*****************	로그인 후: 기업 *****************/}
							<div className={'subMenuPeople'} style={{marginLeft: '23.5rem'}} onClick={(e) => goToURL(e, pageURL_Member_CO_DetailInfo)}>기업정보</div>
							<div className={'subMenuPeople'}>지원요청</div>
							<div className={'subMenuPeople'}>참여요청</div>
							<div className={'subMenuPeople'}>평가관리</div>
							<div className={'subMenuPeople'}>결제내역</div>
							<div className={'subMenuPeople'}>이용권</div>
							<div className={'subButtonArea'} onClick={goLogOut}>
								<ButtonRound title='로그아웃' buttontype='normal' />
							</div>
						</>}
				</div>
			</SubArea>
		</>
	)
}

/****************************************** GNB 영역 **********************************************/
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
	cursor: pointer;
`

const MenuBar = styled.div<menuRightMargin>`
	width: 0.05rem;
	height: 1.5rem;
	background-color: #F6F2EE;
	margin-right: ${props => props.rightmargin};
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
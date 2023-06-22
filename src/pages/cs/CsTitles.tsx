import React, { useLayoutEffect, useState} from 'react'
import {pageURL_CS_Faq, pageURL_CS_NoticeList, pageURL_CS_QnaList} from '@env'
import {useNavigation} from '@hook'
import {PageTitle} from '@components'


interface CsTitlesPropType {
	currentMenu: string
}

function CsTitles({
	currentMenu
}: CsTitlesPropType) {

	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** common basic definition ***************************************************/
	// 현재 메뉴 표시를 위함
	const [titleType, setTitleType] = useState<string[]>([])

	/****************************************************** Handling ***************************************************/
	// useEffect로 깜빡임 현상이 있어 useLayoutEffect로 수정
	useLayoutEffect(() => {
		if(currentMenu==='notice'){
			setTitleType(['Focus','notFocus','notFocus'])
		} else if(currentMenu==='faq') {
			setTitleType(['notFocus','Focus','notFocus'])
		} else {
			setTitleType(['notFocus','notFocus','Focus'])
		}
	},[])


	return (
		<div className={'tabTitleArea'}>
			<span style={{cursor: 'pointer'}} onClick={(e) => goToURL(e, pageURL_CS_NoticeList)}><PageTitle title={'공지사항'} type={titleType[0]}/></span>
			<div className={'titleBar'}></div>
			<span style={{cursor: 'pointer'}} onClick={(e) => goToURL(e, pageURL_CS_Faq)}><PageTitle title={'자주하는 질문'} type={titleType[1]} /></span>
			<div className={'titleBar'}></div>
			<span style={{cursor: 'pointer'}} onClick={(e) => goToURL(e, pageURL_CS_QnaList)}><PageTitle title={'문의하기'} type={titleType[2]} /></span>
		</div>
	)
}

export default React.memo(CsTitles)
import React, { useLayoutEffect, useState} from 'react'
import {pageURL_CS_Faq, pageURL_CS_NoticeList, pageURL_CS_QnaList, pageURL_CS_QnaRegister} from '@env'
import {useNavigation} from '@hook'
import {ButtonGeneral, PageTitle} from '@components'


interface CsTitlesPropType {
	currentMenu: string,
	pageDetail?: string|null,
	pageState?: object|null
}

function CsTitles({
	currentMenu,
	pageDetail,
	pageState
}: CsTitlesPropType) {

	const {goToURL, propState} = useNavigation()

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
			<div className={'pageButtonArea'}>
				{pageDetail==='notice' &&
					<span onClick={(e) => goToURL(e, pageURL_CS_NoticeList, pageState)}>
						<ButtonGeneral
							title={'목록'}
							buttontype={'page'}
							colortype={'pageList'}
						/>
					</span>
				}
				{pageDetail==='faq' &&
				<span onClick={(e) => goToURL(e, pageURL_CS_Faq, pageState)}>
						<ButtonGeneral
							title={'목록'}
							buttontype={'page'}
							colortype={'pageList'}
						/>
					</span>
				}
				{pageDetail==='qnaList' &&
					<span onClick={(e) => goToURL(e, pageURL_CS_QnaRegister, pageState)}>
						<ButtonGeneral
							title={'문의하기'}
							buttontype={'page'}
							colortype={''}
						/>
					</span>
				}
				{pageDetail==='qnaRegister' &&
					<>
						<span onClick={(e) => goToURL(e, pageURL_CS_QnaList, pageState)}>
							<ButtonGeneral
								title={'목록'}
								buttontype={'page'}
								colortype={'pageList'}
							/>
						</span>
						<div className={'emptyDivWidth'} />
						<ButtonGeneral
							title={'문의하기 등록'}
							buttontype={'page'}
							colortype={''}
						/>
					</>
				}
				{pageDetail==='qnaDetail' &&
					<>
						<span onClick={(e) => goToURL(e, pageURL_CS_QnaList, pageState)}>
							<ButtonGeneral
								title={'목록'}
								buttontype={'page'}
								colortype={'pageList'}
							/>
						</span>
						<div className={'emptyDivWidth'} />
						<span onClick={(e) => goToURL(e, pageURL_CS_QnaRegister, pageState)}>
							<ButtonGeneral
								title={'다시 문의하기'}
								buttontype={'page'}
								colortype={''}
							/>
						</span>
					</>
				}
			</div>
		</div>
	)
}

export default React.memo(CsTitles)
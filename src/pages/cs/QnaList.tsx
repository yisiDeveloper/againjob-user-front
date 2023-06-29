import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useNavigation} from '@hook'
import {ButtonRound, PaginationForPage} from '@components'
import './cs.css'
import CsTitles from './CsTitles'
import {FileAttached, NoticeFixed} from '@assets'
import {
	qnaListOnePageSize,
	qnaListPageBlockSize, qnaType,
	pageURL_CS_QnaDetail
} from '@env'
import {qnaData} from '../../_env/SampleData'
import {styled} from 'styled-components'


function QnaList() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()


	/****************************************************** contents initialization or definition ***************************************************/
	// 받아온 propState를 일반 state에 넣고 관리한다.
	// searchOption, searchKeyword
	type listState = {
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({currentPage: propState.currentPage
	})
	// 전체 게시물 수
	const [totalNotiCount, setTotalNotiCount] = useState<number>(1)
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState<number>(1)
	// 목록
	const [qnaContent, setQnaContent] = useState<qnaType[]>([])

	// 공지사항을 가져오자
	const getQnaContent = useCallback((requestPage: number) => {
		// 최초 페이지 로딩 시 currentpage가 없는 경우를 대비
		// console.log('요청받은 ' + requestPage + '페이지의 데이터를 가져옵니다.')
		// console.log('requestPage',requestPage)

		if(requestPage===undefined) {
			requestPage = currentPage
		}
		let tmpQueryData = {
			currentPage: requestPage
		}
		// console.log('보낼 데이터는', tmpQueryData)
		// 전체 게시물 수 세팅
		setCurrentPage(requestPage)
		setQnaContent(qnaData)
		setTotalNotiCount(161 )
		setListState(tmpQueryData)
		// console.log('new liststate', tmpQueryData)
	},[currentPage])

	useLayoutEffect(() => {
		getQnaContent(currentPage)
		if(listState.currentPage) {
			setCurrentPage(listState.currentPage)
		}
	},[])


	/****************************************************** Handling ***************************************************/


	return (
		<main>
			<CsTitles currentMenu={'Qna'} pageDetail={'qnaList'} />
			<section className={'container'}>
				<ul>
					{
						qnaContent.map((data) => {
							return (
								<li key={data.id} onClick={(e) => goToURL(e, pageURL_CS_QnaDetail, {listState, notiID: data.id})} className={'listRow'}>
									<div className={'listColumn'}>
										<article className={'listSubjectArea'}>
											<span className={'listSubjectText'}>{data.title}</span>
										</article>
										<article className={'listContentDesc'}>{data.content}</article>
									</div>
									<div className={'listColumnBar'}></div>
									{(data.files) ? <><ListFile /><div className={'listColumnBar'}></div></> : <div />}
									<div className={'listColumn'}>
										{(data.answer) ?
										<ButtonRound title={'답변완료'} buttontype={''}
										/> : <ButtonRound title={'답변대기'} buttontype={'disabled'} />}
									</div>
								</li>
							)
						})
					}
				</ul>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<PaginationForPage
					currentPage={currentPage}
					pageSize={qnaListOnePageSize}
					pageBlockSize={qnaListPageBlockSize}
					totalCounts={totalNotiCount}
					getData={getQnaContent}
				/>
				<div className={'emptyDivHeight'} />
			</section>
		</main>
	)
}

const ListFixedFile = styled.div`
	margin: 0 2rem 0 2rem;
	height: 5rem;
`

const ListFixed = styled(ListFixedFile)`
	min-width: 1.8rem;
	background: url(${NoticeFixed}) no-repeat center center;	
`

const ListFile = styled(ListFixedFile)`
	min-width: 1.7rem;
	background: url(${FileAttached}) no-repeat center center;
`
export default React.memo(QnaList)
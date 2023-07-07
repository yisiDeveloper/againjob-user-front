import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useForm, useNavigation} from '@hook'
import {ButtonRound, ListSearch, PaginationForPage} from '@components'
import './cs.css'
import CsTitles from './CsTitles'
import {FileAttached, NoticeFixed} from '@assets'
import {
	noticeListOnePageSize,
	noticeListPageBlockSize, noticeType,
	pageURL_CS_NoticeDetail
} from '@env'
import {notiData} from '../../_env/SampleData'
import {styled} from 'styled-components'


function NoticeList() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()

	// console.log('notice list state', propState)

	/****************************************************** contents initialization or definition ***************************************************/
	// 받아온 propState를 일반 state에 넣고 관리한다.
	// searchOption, searchKeyword
	type listState = {
		searchOption: string,
		searchKeyword: string,
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({
		searchOption: propState.searchOption, searchKeyword: propState.searchKeyword, currentPage: propState.currentPage
	})
	// 전체 게시물 수
	const [totalNotiCount, setTotalNotiCount] = useState<number>(1)
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState<number>(1)
	// 목록
	const [notiContent, setNotiContent] = useState<noticeType[]>([])

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		searchOption: 'subject',
		searchKeyword: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		// searchOption: false,
		searchKeyword: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage,
		changeHandler
	} = useForm({
		initialValues,
		initialErrors
	})

	// 공지사항을 가져오자
	const getNotiContent = useCallback((requestPage: number) => {
		// 최초 페이지 로딩 시 currentpage가 없는 경우를 대비
		// console.log('요청받은 ' + requestPage + '페이지의 데이터를 가져옵니다.')
		// console.log('requestPage',requestPage)

		if(requestPage===undefined) {
			requestPage = currentPage
		}
		let tmpQueryData = {
			searchOption:values.searchOption,
			searchKeyword: values.searchKeyword,
			currentPage: requestPage
		}
		// console.log('보낼 데이터는', tmpQueryData)
		// 전체 게시물 수 세팅
		setCurrentPage(requestPage)
		setNotiContent(notiData)
		setTotalNotiCount(161 )
		setListState(tmpQueryData)
		// console.log('new liststate', tmpQueryData)
	},[currentPage, values])

	useLayoutEffect(() => {
		getNotiContent(currentPage)
		if(listState.currentPage) {
			setCurrentPage(listState.currentPage)
		}
	},[])


	/****************************************************** Handling ***************************************************/


	return (
		<main>
			<CsTitles currentMenu={'notice'} />
			<ListSearch
				options={[{id:'subject', title:'제목'},{id: 'content', title:'내용'}]}
				values={values}
				errors={errors}
				inputHandler={(e) => inputHandler(e, 2, 'text', '검색어는 ')}
				changeHandler={changeHandler}
				errorMessage={messages.searchKeyword}
				submitHandler={getNotiContent}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				<ul>
					{
						notiContent.map((data) => {
							return (
								<li key={data.id} onClick={(e) => goToURL(e, pageURL_CS_NoticeDetail, {listState, notiID: data.id})} className={'listRow'}>
									<div className={'listColumn'}>
										<article className={'listSubjectArea'}>
											<ButtonRound title={'개인회원'} buttontype={''}
											/>
											<div className={'emptyDivWidth'} />
											<span className={'listSubjectText'}>{data.title}</span>
										</article>
										<article className={'listContentDesc'}>{data.content}</article>
									</div>
									<div className={'listColumnBar'}></div>
									{(data.fixed) ? <><ListFixed /><div className={'listColumnBar'} /></> : <div />}
									{(data.files) ? <><ListFile /><div className={'listColumnBar'} /></> : <div />}
									<div className={'listColumn'}>
										<p className={'listColumnTitle'}>등록일</p>
										<p>{data.registerDate}</p>
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
					pageSize={noticeListOnePageSize}
					pageBlockSize={noticeListPageBlockSize}
					totalCounts={totalNotiCount}
					getData={getNotiContent}
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
export default React.memo(NoticeList)
import React, {useLayoutEffect, useState} from 'react'
import {useForm, useList, useNavigation} from '@hook'
import {ButtonRound, ListSearch, PaginationForPage, Popup} from '@components'
import './cs.css'
import CsTitles from './CsTitles'
import {FileAttached, NoticeFixed} from '@assets'
import {
	commMessage,
	noticeListOnePageSize,
	noticeListPageBlockSize,
	pageURL_CS_NoticeDetail
} from '@env'
import {notiData} from '../../_env/SampleData'
import {styled} from 'styled-components'
import {popupClose} from '@handler'


function NoticeList() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// list관리를 위한 값
	type listState = {
		searchOption: string,
		searchKeyword: string,
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({
		searchOption: (propState.searchOption) ? propState.searchOption : 'subject',
		searchKeyword: propState.searchkeyword,
		currentPage: propState.currentpage
	})
	//  팝업을 관리할 state
	const [popDP, setPopDP] = useState<boolean>(false)
	const [popMsg, setPopMsg] = useState<object>()
	const [popType, setPopType] = useState<string>('')

	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsg,
		apiURL: notiData,
		setliststate: setListState,
		poptypesetter: setPopType
	})

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		searchOption: (propState.searchOption) ? propState.searchOption : 'subject',
		searchKeyword: (propState.searchKeyword) ? propState.searchKeyword : ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
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

	/****************************************************** Handling ***************************************************/
	useLayoutEffect(() => {
		// 넘어온 데이터가 있다면 세팅한다.
		if(propState.searchKeyword) {
			setListState(propState)
			getListContent(propState.currentPage, propState)
		} else {
			getListContent(listState.currentPage, listState)
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
				submitHandler={() => getListContent(1, {searchOption: values.searchOption, searchKeyword: values.searchKeyword, currentPage: 1})}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				<ul>
					{
						listContent.map((data) => {
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
										<p className={'listColumnContent'}>{data.registerDate}</p>
									</div>
								</li>
							)
						})
					}
				</ul>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
  				<PaginationForPage
					currentPage={listState.currentPage}
					pageSize={noticeListOnePageSize}
					pageBlockSize={noticeListPageBlockSize}
					totalCounts={totalListCount}
					getData={getListContent}
					liststate={listState}
				/>
				<div className={'emptyDivHeight'} />
			</section>
			{popDP && <Popup
				popMsg={popMsg}
				okFunc={(e) => popupClose(e, setPopDP)}
				bgFunc={(e) => popupClose(e, setPopDP)}
				popupType={popType}
			/>}
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
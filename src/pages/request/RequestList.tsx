import React, {useLayoutEffect, useState} from 'react'
import {useForm, useList, useNavigation} from '@hook'
import {requestList} from '../../_env/SampleData'
import {ButtonGeneral, ButtonRound, ListSearch, PageTitle, PaginationForPage, Popup} from '@components'
import {applyListOnePageSize, applyListPageBlockSize, commMessage, pageURL_Involve_Detail} from '@env'
import {popupClose} from '@handler'


function RequestList() {

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
		searchOption: (propState.searchOption) ? propState.searchOption : 'requestSubject',
		searchKeyword: propState.searchkeyword,
		currentPage: propState.currentpage
	})
	//  팝업을 관리할 state
	const [popDP, setPopDP] = useState<boolean>(false)
	const [popMsgCode, setPopMsgCode] = useState<string>('')

	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsgCode,
		apiURL: requestList,
		setliststate: setListState
	})

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		searchOption: (propState.searchOption) ? propState.searchOption : 'requestSubject',
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

	return (
		<main>
			<section className={'memberTitleArea'}>
				<PageTitle title={'받은 요청'} />
			</section>
			<ListSearch
				options={[{id:'requestSubject', title:'요청제목'}]}
				values={values}
				errors={errors}
				inputHandler={(e) => inputHandler(e, 2, 'text', '검색어는 ')}
				changeHandler={changeHandler}
				errorMessage={messages.searchKeyword}
				submitHandler={() => getListContent(1, {searchOption: values.searchOption, searchKeyword: values.searchKeyword, currentPage: 1})}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				{/********************** 받은 요청이 없는 경우 *********************/}
				{(listContent.length===0) ?
					<div className={'noApplyDataWrap'}>
						<p className={'noApplyTitle'}>받은 요청이 없습니다.</p>
						<p className={'noApplySubTitle'}>최신 일거리 또는 채용 정보를 확인하시고 지원해보세요.</p>
						<div className={'noApplyButtonArea'}>
							<ButtonGeneral
								title={'일거리정보 확인하기'}
								buttontype={'large'}
							/>
							<div className={'emptyDivHeight'} />
							<ButtonGeneral
								title={'채용정보 확인하기'}
								buttontype={'large'}
							/>
						</div>
					</div>
					:
					<ul>
						{
							listContent.map((data) => {
								return (
									<li key={data.id} className={'listRow'}>
										<div className={'listColumn'}>
											<article className={'listSubjectArea'}>
												<span className={'listSubjectText'}>{data.title}</span>
											</article>
											<article className={'listContentDesc'}>
												{(data.requestKind==='recruit') ?
													<ButtonRound
														title={'채용'}
														buttontype={''}
													/>
													:
													<ButtonRound
														title={'일거리'}
														buttontype={''}
													/>}
												<div className={'emptyDivWidth'} />
												{data.recruitORprojectName}
											</article>
										</div>
										<div className={'listColumnBar'}></div>
										<div className={'listColumn applyListColumnWidth'}>
											<p className={'listColumnTitle listColumnMargin'}>검토마감</p>
											<p className={'listColumnContent listColumnMargin'}>{data.reviewDeadLine}</p>
										</div>
										<div className={'listColumnBar'}></div>
										<div className={'listColumn applyListColumnWidth'}>
											<p className={'listColumnTitle listColumnMargin'}>지원마감</p>
											<p className={'listColumnContent listColumnMargin'}>{data.applyDeadLine}</p>
										</div>
										<div className={'listColumn'}>
											<ButtonGeneral
												title={'거절'}
												colortype={'disabled'}
											/>
											<div style={{height: '1rem'}} />
											<ButtonGeneral
												title={'지원'}
											/>
										</div>
									</li>
								)
							})
						}
						<div className={'emptyDivHeight'} />
						<div className={'emptyDivHeight'} />
						<PaginationForPage
							currentPage={listState.currentPage}
							pageSize={applyListOnePageSize}
							pageBlockSize={applyListPageBlockSize}
							totalCounts={totalListCount}
							getData={getListContent}
							liststate={listState}
						/>
						<div className={'emptyDivHeight'} />
					</ul>}
			</section>
			{popDP && <Popup
				popMsg={commMessage(popMsgCode)}
				okFunc={(e) => popupClose(e, setPopDP)}
				bgFunc={(e) => popupClose(e, setPopDP)}
			/>}
		</main>
	)
}

export default React.memo(RequestList)
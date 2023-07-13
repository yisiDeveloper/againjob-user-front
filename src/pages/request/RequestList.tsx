import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useForm, useList, useNavigation} from '@hook'
import {ButtonGeneral, ButtonRound, ListSearch, PageTitle, PaginationForPage, Popup} from '@components'
import {
	commMessage,
	requestListOnePageSize,
	requestListPageBlockSize
} from '@env'
import {changeDate, popupClose} from '@handler'
import RequestReply from './RequestReply'
import {requestList} from '../../_env/SampleData'


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
	const [popMsg, setPopMsg] = useState<object>()
	const [popType, setPopType] = useState<string>('')
	const [contentID, setContentID] = useState<number>()
	// 날짜를 비교하기 위한 세팅
	const [todayDate,] = useState<string>(changeDate((new Date).toString()))
	//  답변하기 팝업
	const [replyDP, setReplyDP] = useState<boolean>(false)


	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsg,
		apiURL: requestList,
		setliststate: setListState,
		poptypesetter: setPopType
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
	// 지원, 참여, 거절을 위한 팝업 handling
	const popupHandling = useCallback((e:React.SyntheticEvent, id: number, type: string) => {
		e.preventDefault()

		setContentID(id)

		if(type==='delete') {
			// 거절인경우
			setPopMsg(commMessage('CONFIRM_DELETE'))
			setPopType('confirm')
			setPopDP(true)
		} else if (type==='reply') {
			setReplyDP(true)
		}
	},[])

	// 요청을 삭제한다.
	const deleteRequest = useCallback((e: React.SyntheticEvent, id:number) => {
		e.preventDefault()

		// alert(id+'번 delete')
		setPopMsg(commMessage('DELETE_COMPLETE'))
		setPopType('')
		setPopDP(true)
	},[])

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
								// 답변여부는 표기하지 않음
								// 지원, 참여완료의 여부
								let btn1_Name: string, btn1_colorType: string
								// 지원 또는 참여마감 기한이 지났거나, 이미 지원, 참여한 경우
								if(data.applyDeadLine < todayDate || data.applyFlag) {
									btn1_colorType = 'disabled'
								}
								// 지원 또는 참여를 한 경우
								if(data.applyFlag) {
									btn1_Name = (data.requestKind==='recruit') ? '지원완료' : '참여완료'
								} else {
									btn1_Name = (data.requestKind==='recruit') ? '지원' : '참여'
								}

								return (
									<li key={data.id} className={'listRow'}>
										<div className={'listColumn'}>
											<article className={'listSubjectArea'}>
												<span className={'listSubjectText'} onClick={(e) => popupHandling(e, data.id, 'reply')}>{data.title}</span>
												{(data.replyFlag) &&
													<>
														<div className={'emptyDivWidth'} />
														<ButtonRound title={'답변완료'} buttontype={'popupsmall'}
														/>
													</>
												}
											</article>
											<article className={'listContentDesc'}>
												{(data.requestKind==='recruit') ?
													<ButtonRound
														title={'채용'}
														buttontype={'small'}
													/>
													:
													<ButtonRound
														title={'일거리'}
														buttontype={'small'}
													/>
												}
												<div className={'emptyDivWidth'} />
												<span onClick={() => alert('공고로 가자')}>{data.recruitORprojectName}</span>
											</article>
										</div>
										<div className={'listColumnBar'}></div>
										<div className={'listColumn applyListColumnWidth'}>
											<p className={'listColumnTitle listColumnMargin'}>요청일</p>
											<p className={'listColumnContent listColumnMargin'}>{data.requestDate}</p>
										</div>
										<div className={'listColumnBar'}></div>
										<div className={'listColumn applyListColumnWidth'}>
											<p className={'listColumnTitle listColumnMargin'}>
												{(data.requestKind==='recruit') ? '지원마감' : '참여마감'}</p>
											<p className={'listColumnContent listColumnMargin'}>{data.applyDeadLine}</p>
										</div>
										<div className={'listColumn'}>
											<ButtonGeneral
												title={btn1_Name}
												colortype={btn1_colorType!}
											/>
											<div style={{height: '1rem'}} />
											<span onClick={(e) => popupHandling(e, data.id, 'delete')}>
											<ButtonGeneral
												title={'삭제'}
											/></span>
										</div>
									</li>
								)
							})
						}
						<div className={'emptyDivHeight'} />
						<div className={'emptyDivHeight'} />
						<PaginationForPage
							currentPage={listState.currentPage}
							pageSize={requestListOnePageSize}
							pageBlockSize={requestListPageBlockSize}
							totalCounts={totalListCount}
							getData={getListContent}
							liststate={listState}
						/>
						<div className={'emptyDivHeight'} />
					</ul>}
			</section>
			{popDP && <Popup
				popMsg={popMsg}
				okFunc={(e) => deleteRequest(e, contentID!)}
				bgFunc={(e) => popupClose(e, setPopDP)}
				cancelFunc={(e) => popupClose(e, setPopDP)}
				popupType={popType}
			/>}
			{replyDP && <RequestReply targetId={contentID!} bgFunc={(e) => popupClose(e, setReplyDP)}/>}
		</main>
	)
}

export default React.memo(RequestList)
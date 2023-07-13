import React, {useLayoutEffect, useState} from 'react'
import {
	commMessage,
	involveListOnePageSize, involveListPageBlockSize,
	pageURL_Involve_Detail
} from '@env'
import {useForm, useList, useNavigation} from '@hook'
import {ButtonGeneral, ListSearch, PageTitle, PaginationForPage, Popup} from '@components'
import './involve.css'
import {popupClose} from '@handler'
import {involveList} from '../../_env/SampleData'


function InvolveList() {

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
		searchOption: (propState.searchOption) ? propState.searchOption : 'projectName',
		searchKeyword: propState.searchkeyword,
		currentPage: propState.currentpage
	})
	//  팝업을 관리할 state
	const [popDP, setPopDP] = useState<boolean>(false)
	const [popMsgCode, setPopMsgCode] = useState<string>('')
	const [popType, setPopType] = useState<string>('')

	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsgCode,
		apiURL: involveList,
		setliststate: setListState,
		poptypesetter: setPopType
	})

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		searchOption: (propState.searchOption) ? propState.searchOption : 'projectName',
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
				<PageTitle title={'참여 관리'} />
			</section>
			<ListSearch
				options={[{id:'projectName', title:'일거리명'},{id: 'proposalName', title:'제안명'}]}
				values={values}
				errors={errors}
				inputHandler={(e) => inputHandler(e, 2, 'text', '검색어는 ')}
				changeHandler={changeHandler}
				errorMessage={messages.searchKeyword}
				submitHandler={() => getListContent(1, {searchOption: values.searchOption, searchKeyword: values.searchKeyword, currentPage: 1})}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				{/********************** 참여 이력이 없는 경우 *********************/}
				{(listContent.length===0) ?
					<div className={'noApplyDataWrap'}>
						<p className={'noApplyTitle'}>참여 이력이 없습니다.</p>
						<p className={'noApplySubTitle'}>최신 일거리 정보를 확인하시고 지원해보세요.</p>
						<div className={'noApplyButtonArea'}>
							<ButtonGeneral
								title={'일거리정보 확인하기'}
								buttontype={'large'}
							/>
							<div className={'emptyDivHeight'} />
							<ButtonGeneral
								title={'도움말 보러가기'}
								buttontype={'large'}
							/>
						</div>
					</div>
					:
					<ul>
						{
							listContent?.map((data) => {
								return (
									<li key={data.id} className={'involeListRow'}>
										<div style={{flexGrow: '1'}} onClick={(e) => goToURL(e,pageURL_Involve_Detail,{listState,involveId: data.id})}>
											<div className={'involeListWrap'}>
												<div className={'listColumn'}>
													<article className={'listSubjectArea'}>
														<span className={'listSubjectText'}>{data.title}</span>
													</article>
													<span className={'listColumnTitle'}>예상기간 </span>
													<div className={'emptyDivWidth'} />
													<span>{data.estimatePeriod}일</span>
													<div className={'listContentBar'} />
													<span>{data.address}</span>
												</div>
												<div className={'listColumnBar'}></div>
												<div className={'listColumn'} style={{marginLeft: '-1rem'}}>
													<span className={'listColumnTitle listColumnMargin'}>검토마감</span>
													<div className={'emptyDivWidth'} />
													<span>{data.reviewDeadline}</span>
													<div style={{height: '1rem'}} />
													<span className={'listColumnTitle listColumnMargin'}>예상금액</span>
													<div className={'emptyDivWidth'} />
													<span>{data.estimateAmount} 만원</span>
												</div>
											</div>
											<div className={'emptyDivHeight'} />
											<div className={'involeListWrap'}>
												<div className={'listColumn'}>
													<article className={'listSubjectArea'}>
														<span className={'listSubjectText involveProposalTitle'}>{data.proposalTitle}</span>
													</article>
													<span className={'listColumnTitle'}>{data.proposalSubContent}</span>
												</div>
												<div className={'listColumnBar'}></div>
												<div className={'listColumn'} style={{marginLeft: '-1rem'}}>
													<span className={'listColumnTitle listColumnMargin'}>참여완료</span>
													<div className={'emptyDivWidth'} />
													<span>{data.proposalDate}</span>
													<div style={{height: '1rem'}} />
													<span className={'listColumnTitle listColumnMargin'}>참여금액</span>
													<div className={'emptyDivWidth'} />
													<span>{data.proposalAmount} 만원</span>
												</div>
											</div>
										</div>
										<div className={'listColumn'}>
											<ButtonGeneral
												title={'참여종료'}
												colortype={'disabled'}
											/>
											<div style={{height: '1rem'}} />
											<ButtonGeneral
												title={'삭제'}
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
							pageSize={involveListOnePageSize}
							pageBlockSize={involveListPageBlockSize}
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
				popupType={popType}
			/>}
		</main>
	)
}

export default React.memo(InvolveList)
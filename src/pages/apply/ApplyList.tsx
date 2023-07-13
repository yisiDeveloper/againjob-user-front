import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useForm, useList, useNavigation} from '@hook'
import {ButtonGeneral, ListSearch, PageTitle, PaginationForPage, Popup} from '@components'
import {
	applyListOnePageSize, applyListPageBlockSize, commMessage
} from '@env'
import './apply.css'
import {applyList} from '../../_env/SampleData'
import {popupClose} from '@handler'


function ApplyList() {

	/****************************************************** common basic definition ***************************************************/
	const {propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 받아온 propState를 일반 state에 넣고 관리한다.
	// searchOption, searchKeyword
	type listState = {
		searchOption: string,
		searchKeyword: string,
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({
		searchOption: (propState.searchOption) ? propState.searchOption : 'recruitName',
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
		apiURL: applyList,
		setliststate: setListState,
		poptypesetter: setPopType
	})

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		searchOption: (propState.searchOption) ? propState.searchOption : 'recruitName',
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
			<PageTitle title={'지원 관리'} />
			<ListSearch
				options={[{id:'recruitName', title:'채용명'}]}
				values={values}
				errors={errors}
				inputHandler={(e) => inputHandler(e, 2, 'text', '검색어는 ')}
				changeHandler={changeHandler}
				errorMessage={messages.searchKeyword}
				submitHandler={() => getListContent(1, {searchOption: values.searchOption, searchKeyword: values.searchKeyword, currentPage: 1})}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				{/********************** 지원 이력이 없는 경우 *********************/}
				{(listContent.length===0) ?
				<div className={'noApplyDataWrap'}>
					<p className={'noApplyTitle'}>지원 이력이 없습니다.</p>
					<p className={'noApplySubTitle'}>최신 채용 정보를 확인하시고 지원해보세요.</p>
					<div className={'noApplyButtonArea'}>
						<ButtonGeneral
							title={'채용정보 확인하기'}
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
						listContent.map((data) => {
							return (
								<li key={data.id} className={'listRow'}>
									<div className={'listColumn'}>
										<article className={'listSubjectArea'}>
											<span className={'listSubjectText'}>{data.title}</span>
										</article>
										<article className={'listContentDesc'}>{data.subContent}</article>
									</div>
									<div className={'listColumnBar'}></div>
									<div className={'listColumn applyListColumnWidth'}>
										<p className={'listColumnTitle listColumnMargin'}>지원</p>
										<p className={'listColumnContent listColumnMargin'}>{data.applyDate}</p>
									</div>
									<div className={'listColumnBar'}></div>
									<div className={'listColumn applyListColumnWidth'}>
										<p className={'listColumnTitle listColumnMargin'}>열람</p>
										<p className={'listColumnContent listColumnMargin'}>{(data.open) ? data.open : '미열람'}</p>
									</div>
									<div className={'listColumn'}>
										{(data.open) ?
											<ButtonGeneral
												title={'채용마감'}
												colortype={'disabled'}
											/>
											:
											<ButtonGeneral
												title={'지원취소'}
											/>
										}
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
				popMsg={popMsg}
				okFunc={(e) => popupClose(e, setPopDP)}
				bgFunc={(e) => popupClose(e, setPopDP)}
				popupType={popType}
			/>}
		</main>
	)
}

export default React.memo(ApplyList)
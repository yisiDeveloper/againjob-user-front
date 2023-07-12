import React, {useLayoutEffect, useState} from 'react'
import {
	faqListOnePageSize,
	faqListPageBlockSize, pageURL_CS_FaqDetail
} from '@env'
import {ArrowNext} from '@assets'
import {useForm, useList, useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {ButtonRound, ListSearch, PaginationForPage} from '@components'
import {faqData} from '../../_env/SampleData'
import {styled} from 'styled-components'


interface FAQPropType {
}

function Faq({}: FAQPropType) {

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
	const [popMsgCode, setPopMsgCode] = useState<string>('')

	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsgCode,
		apiURL: faqData,
		setliststate: setListState
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


	return (
		<main>
			<CsTitles currentMenu={'faq'} />
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
								<li key={data.id} className={'faqRow'} onClick={(e) => goToURL(e, pageURL_CS_FaqDetail, {listState, faqID: data.id})}>
									<div>
										<article className={'listSubjectText'}>{data.title}</article>
										<div style={{height: '1rem'}} />
										<article style={{display: 'flex'}}>
											<ButtonRound title={'개인회원'} buttontype={''} />
											<div className={'emptyDivWidth'} />
											<div className={'emptyDivWidth'} />
											<div className={'emptyDivWidth'} />
											<div className={'emptyDivWidth'} />
											<div className={'emptyDivWidth'} />
											<ButtonRound title={'회원가입'} buttontype={'normal'} />
											<div className={'emptyDivWidth'} />
											<MenuLocationArrow />
											<div className={'emptyDivWidth'} />
											<ButtonRound title={'기업회원'} buttontype={'normal'} />
										</article>
										<div style={{height: '1rem'}} />
										<article className={'listContentDesc'}>{data.content}</article>
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
					pageSize={faqListOnePageSize}
					pageBlockSize={faqListPageBlockSize}
					totalCounts={totalListCount}
					getData={getListContent}
					liststate={listState}
				/>
				<div className={'emptyDivHeight'} />
			</section>
		</main>
	)
}

const MenuLocationArrow = styled.div`	
	background: url(${ArrowNext}) no-repeat center center;
	display: inline-block;
	//border: 1px solid red;
	width: 2rem;
	height: 3rem;
`

export default React.memo(Faq)
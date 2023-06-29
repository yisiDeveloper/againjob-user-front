import React, {useCallback, useLayoutEffect, useState} from 'react'
import {
	faqListOnePageSize,
	faqListPageBlockSize, faqType, pageURL_CS_FaqDetail
} from '@env'
import {ArrowNext} from '@assets'
import {useForm, useNavigation} from '@hook'
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
	const [totalFaqCount, setTotalFaqCount] = useState<number>(1)
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState<number>(1)
	// 목록
	const [faqContent, setFaqContent] = useState<faqType[]>([])
		// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			searchOption: 'subject',
			searchKeyword: ''
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
	const getFaqContent = useCallback((requestPage: number) => {
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
		setFaqContent(faqData)
		setTotalFaqCount(161)
		setListState(tmpQueryData)
		// console.log('new liststate', tmpQueryData)
	},[currentPage, values])

	useLayoutEffect(() => {
		getFaqContent(currentPage)
		if(listState.currentPage) {
			setCurrentPage(listState.currentPage)
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
				submitHandler={getFaqContent}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
				<ul>
					{
						faqContent.map((data) => {
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
					currentPage={currentPage}
					pageSize={faqListOnePageSize}
					pageBlockSize={faqListPageBlockSize}
					totalCounts={totalFaqCount}
					getData={getFaqContent}
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
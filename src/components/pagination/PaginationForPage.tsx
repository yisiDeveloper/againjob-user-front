import React, {useCallback, useLayoutEffect, useState} from 'react'
import {paginationNextAvailable, paginationNextDisable, paginationPrevAvailable, paginationPrevDisable} from '@assets'
import {styled, css} from 'styled-components'
import {calcPaginationData, makePageBlock} from '@handler'

interface PaginationType {
	currentPage: number,
	pageSize: number,
	pageBlockSize: number,
	totalCounts: number,
	getData: Function,
	liststate?: any|null
}

function PaginationForPage({
	currentPage,
	pageSize,
	pageBlockSize,
	totalCounts,
	getData,
	liststate
}: PaginationType) {

	/****************************************************** common basic definition ***************************************************/

	/****************************************************** contents initialization or definition ***************************************************/
	// 이전, 다음 페이지 블럭 아이콘
	const [prevIcon, setPrevIcon] = useState<boolean>(false)
	const [nextIcon, setNextIcon] = useState<boolean>(false)
	// 처음, 마지막 text 버튼
	const [goFirst, setGoFirst] = useState<boolean>(false)
	const [goLast, setGoLast] = useState<boolean>(false)
	// 총 페이지 수
	const [lastPageNo, setLastPageNo] = useState<number>(0)
	// 현재의 정보를 기준으로 정보를 조회

	// type numberingType = {
	// 	page: number,
	// 	pageFlag: boolean
	// }
	const [pageNumbering, setPageNumbering] = useState<any[]>([])

	/****************************************************** Handling ***************************************************/
		// 페이지 이동 page가 1이면 맨 처음 또는 첫 페이지, 0이면 마지막 페이지
	const movePage = useCallback((e: React.SyntheticEvent, page: number) => {
		e.preventDefault()

		let tmpData = calcPaginationData(currentPage, pageSize, pageBlockSize, totalCounts)
		if(currentPage !== page) {
			let rqPage = (page === 0)
				? tmpData.totalPages : page
			if(!rqPage) {
				alert(page + ' 페이지 계산 도중 에러가 발생했습니다.')
			} else {
				getData(page, liststate)
			}
		} else {
			console.log('현재 페이지와 같은 페이지 요청')
		}
	},[totalCounts, currentPage, liststate])

	// 이전, 다음 블럭으로 이동
	// type 0 이면 이전 블럭, 1이면 다음 블럭
	const moveToBlock = useCallback((e: React.SyntheticEvent, type: number) => {

		let tmpData = calcPaginationData(currentPage, pageSize, pageBlockSize, totalCounts)

		// 현재 첫번째 블록인데 이전 블록 버튼을 누른경우
		if(type===0 && tmpData.currentPageBlock===1) {
			console.log('이전을 요청했지만 지금이 첫번째 블럭')
			return false
		} else if (type===1 && tmpData.totalPageBlock === tmpData.currentPageBlock){
			console.log('다음을 요청했지만 같은 블럭')
			return false
		}

		let tmpCurrentPage = currentPage
		if(type===0) {
			tmpCurrentPage = calcPaginationData(currentPage-pageBlockSize, pageSize, pageBlockSize, totalCounts).lastPage
		}
		if(type===1) {
			tmpCurrentPage = calcPaginationData(currentPage+pageBlockSize, pageSize, pageBlockSize, totalCounts).startPage
		}
		getData(tmpCurrentPage, liststate)

	},[currentPage, totalCounts, liststate])

	useLayoutEffect(() => {
		// 현재 페이지를 확인한다.
		// console.log('넘어온 현재 페이지',currentPage)
		// console.log('넘어온 총 페이지 수',totalCounts)
		let tmpData = calcPaginationData(currentPage, pageSize, pageBlockSize, totalCounts)

		setLastPageNo(tmpData.totalPages)
		// 현재 페이지가 첫 페이지가 아니라면 처음 글자를 available 상태로 만든다.
		if(currentPage !== 1) {
			setGoFirst(true)
		} else {
			setGoFirst(false)
		}
		// 현재 페이지가 마지막 페이지가 아니라면 마지막 글자를 available 상태로
		if(currentPage !== tmpData.totalPages) {
			setGoLast(true)
		} else {
			setGoLast(false)
		}
		// 현재 페이지가 페이지 블록 사이즈보다 작거나 같다면 첫번째 블록에 있는 것이다.
		// 즉 현재 페이지가 페이지 블록 사이트보다 크다면 첫번째 블록이 아닌 셈
		if(currentPage > pageBlockSize) {
			setPrevIcon(true)
		} else {
			setPrevIcon(false)
		}
		// 현재 페이지블록이 전체 블록 사이즈보다 작다면... 마지막 블록이 아닌 것이다.
		if(tmpData.currentPageBlock < tmpData.totalPageBlock) {
			setNextIcon(true)
		} else {
			setNextIcon(false)
		}

		let tmp = makePageBlock(currentPage, tmpData.startPage, tmpData.lastPage)
		setPageNumbering(tmp)

	},[currentPage, pageSize, pageBlockSize, totalCounts])

	return (
		<PaginationArea>
			<PageFirstLastText onClick={(e) => movePage(e, 1)} colortype={goFirst.toString()}>처음</PageFirstLastText>
			<PagePrev onClick={(e) => moveToBlock(e, 0)} bgimage={prevIcon.toString()}/>
			{
				pageNumbering.map((data) => {
					return (
						<PageNumber key={data.page} onClick={(e) => movePage(e, data.page)} currentpage={data.pageFlag.toString()}>{data.page}</PageNumber>
					)
				})
			}
			<PageNext onClick={(e) => moveToBlock(e, 1)} bgimage={nextIcon.toString()}/>
			<PageFirstLastText onClick={(e) => movePage(e, lastPageNo)}colortype={goLast.toString()}>마지막</PageFirstLastText>
		</PaginationArea>
	)
}

/**************************** pagination area ******************************/
const PaginationArea = styled.div`
	text-align: center;
	vertical-align: bottom;
	& > * {
		padding: 1rem;
		display: inline-block;
		font-size: 1.4rem;
		font-weight: var(--fontWeightMiddle);
		color: var(--fontPaginationBasicColor);
	}
`
/**************************** page next/prev block icon ******************************/
const PageIcon = styled.span`
	margin: 0 3rem -0.8rem 3rem;
	vertical-align: baseline;
	//padding: 1rem;
	height: 3rem;
	//border: 1px solid red;
`
type PrevType = {
	bgimage: string
}
const PagePrev = styled(PageIcon)<PrevType>`
	background: url(${props => props.bgimage}) no-repeat center 1rem;
	${props => props.bgimage==='true' ?
		css `background: url(${paginationPrevAvailable}) no-repeat center 1rem;cursor:pointer;`
		:
		css `background: url(${paginationPrevDisable}) no-repeat center 1rem;`}
`

const PageNext = styled(PageIcon)<PrevType>`
	${props => props.bgimage==='true' ?
		css `background: url(${paginationNextAvailable}) no-repeat center 1rem;cursor:pointer;`
		:
		css `background: url(${paginationNextDisable}) no-repeat center 1rem;`}
`

/**************************** page next/prev number ******************************/
type pageNumberType = {
	currentpage: string
}
const PageNumber = styled.span<pageNumberType>`
	width: 4.5rem;
	border-bottom: 0.05rem solid var(--paginationLineBasic);
	${props => props.currentpage==='true' ?
		css `color: var(--fontPaginationFocusColor);border-bottom: 0.05rem solid var(--paginnationLineFocus);`
		:
		css `color: var(--fontPaginationBasicColor);cursor: pointer;border-bottom: 0.05rem solid var(--paginationLineBasic);`}
	&:hover {
		color: var(--fontPaginationFocusColor);
		border-bottom: 0.05rem solid var(--paginnationLineFocus);
	}
`

/**************************** page first/last text ******************************/
type pageTextType = {
	colortype: string
}
const PageFirstLastText = styled.span<pageTextType>`
	font-weight: var(--fontWeightBold);
	color: ${props => props.colortype === 'true' ? 'var(--fontPaginationFocusColor); cursor: pointer' : 'var(--fontPaginationBasicColor);'}
`
export default React.memo(PaginationForPage)
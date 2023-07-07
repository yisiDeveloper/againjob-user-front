import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useNavigation} from '@hook'
import {popup_CLoseButton} from '@assets'
import {qnaData, requestOpenContact} from '../../_env/SampleData'

import styled from 'styled-components'
import {ButtonGeneral, ButtonRound, PaginationForPage} from '@components'
import {pageURL_Resume_Detail, requestContactInfoOnePageSize, requestContactInfoPageBlockSize} from '@env'


interface RequestContactInfoPropType {
	targetId: number,
	bgFunc: (e: React.MouseEvent) => void,
}

function RequestContactInfo({
	targetId,
	bgFunc
}: RequestContactInfoPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	type listState = {
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({currentPage: propState.currentPage
	})
	// 전체 게시물 수
	const [totalNotiCount, setTotalNotiCount] = useState<number>(1)
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState<number>(1)
	// 데이터
	const [requestData, setRequestData] = useState<any[]>([])

	/****************************************************** Handling ***************************************************/
	// 요청 목록을 불러오자
	const getRequestList = useCallback((requestPage: number) => {

		if(requestPage===undefined) {
			requestPage = currentPage
		}
		let tmpQueryData = {
			currentPage: requestPage
		}
		// 전체 게시물 수 세팅
		setCurrentPage(requestPage)
		setTotalNotiCount(161 )
		setListState(tmpQueryData)
		setRequestData(requestOpenContact)
	},[targetId, currentPage])


	useLayoutEffect(() => {
		getRequestList(currentPage)
		if(listState.currentPage) {
			setCurrentPage(listState.currentPage)
		}
	},[targetId])


	return (
		<>
			<section className={'contentPopupWrap'}>
				<div className={'popTitleArea'}>
					<div className={'popTitle'}>연락처 공개요청</div>
					<p className={'popClose'} onClick={bgFunc}>
						<img src={popup_CLoseButton} alt='close '/>
					</p>
				</div>
				<div className={'emptyDivHeight'} />
				<div>
					{
						requestData.map((data) => {

							return (
								//
								<li key={data.id} className={'popupListRow'}>
									<div className={'popupListColumn'}>
										<article className={'popupListSubjectArea'}>
											<span className={'popupListSubjectText popupListContentNameColor'}>요청이력서</span>
											&nbsp;&nbsp;
											<span className={'popupListSubjectText'}>{data.title}</span>
										</article>
										<span className={'ListColumnTitle popupListColumnTextSize popupListContentNameColor'}>회사명</span>
										<div className={'emptyDivWidth'} />
										<span className={'popupListColumnTextSize'}>{data.coName}</span>
										<div className={'listContentBar popupListContentBar'} />
										<span className={'ListColumnTitle popupListColumnTextSize popupListContentNameColor'}>요청일</span>
										<div className={'emptyDivWidth'} />
										<span className={'popupListColumnTextSize'}>{data.requestDate}</span>
										<div style={{height: '0.5rem'}} />
										<article className={'popupListSubjectArea'}>
											<span className={'ListColumnTitle popupListColumnTextSize popupListContentNameColor'}>채용 중 공고</span>
											<div className={'emptyDivWidth'} />
											<span className={'popupListColumnTextSize'}>{data.recruitName}</span>
											&nbsp;&nbsp;
											<span><ButtonRound title={'공고 더보기'} buttontype={'popupsmall'} /></span>
										</article>
									</div>
									<div>
										<div><ButtonGeneral title={'승락'} buttontype={'small'} colortype={'sky'} /></div>
										<div style={{height: '0.5rem'}} />
										<div><ButtonGeneral title={'거절'} buttontype={'small'} /></div>
										<div style={{height: '0.5rem'}} />
										<div><ButtonGeneral title={'삭제'} buttontype={'small'} /></div>
									</div>
								</li>
							)
						})
					}
					<div className={'emptyDivWidth'} />
					<PaginationForPage
						currentPage={currentPage}
						pageSize={requestContactInfoOnePageSize}
						pageBlockSize={requestContactInfoPageBlockSize}
						totalCounts={50}
						getData={getRequestList}
					/>
				</div>
			</section>
			<div className={'comBG'} onClick={bgFunc} />
		</>
	)
}

export default React.memo(RequestContactInfo)
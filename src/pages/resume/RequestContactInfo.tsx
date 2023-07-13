import React, {useCallback, useLayoutEffect, useState} from 'react'
import {useList, useNavigation} from '@hook'
import {popup_CLoseButton} from '@assets'
import {requestList, requestOpenContact} from '../../_env/SampleData'
import {ButtonGeneral, ButtonRound, PaginationForPage, Popup} from '@components'
import {
	commMessage,
	requestContactInfoOnePageSize,
	requestContactInfoPageBlockSize,
	requestListOnePageSize,
	requestListPageBlockSize
} from '@env'
import {popupClose} from '@handler'


interface RequestContactInfoPropType {
	targetId: number,
	bgFunc: (e: React.MouseEvent) => void,
}

function RequestContactInfo({
	targetId,
	bgFunc
}: RequestContactInfoPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	type listState = {
		currentPage: number
	}
	const [listState, setListState] = useState<listState>({currentPage: propState.currentPage
	})
	//  팝업을 관리할 state
	const [popDP, setPopDP] = useState<boolean>(false)
	const [popMsg, setPopMsg] = useState<object>()
	const [popType, setPopType] = useState<string>('')
	const [contentID, setContentID] = useState<number>()

	// list를 정의한다.
	const {
		getListContent,
		listContent,
		totalListCount
	} = useList({
		popupdpsetter: setPopDP,
		popupmsgsetter: setPopMsg,
		apiURL: requestOpenContact,
		setliststate: setListState,
		poptypesetter: setPopType
	})

	/****************************************************** Handling ***************************************************/
	// 지원, 참여, 거절을 위한 팝업 handling
	const popupHandling = useCallback((e:React.SyntheticEvent, id: number, type: string) => {
			e.preventDefault()

			if(type==='delete') {
				// 거절인경우
				setPopMsg(commMessage('CONFIRM_DELETE'))
				setPopType('confirm')
				setPopDP(true)
				setContentID(id)
			} else if(type==='accept') {
				setPopMsg(commMessage('CONFIRM_ACCEPT'))
				setPopType('confirm')
				setPopDP(true)
				setContentID(id)
			} else if(type==='reject') {
				setPopMsg(commMessage('CONFIRM_REJECT'))
				setPopType('confirm')
				setPopDP(true)
				setContentID(id)
			}
		},[popDP, contentID, popMsg, popType])

	// 요청을 삭제한다.
	const requestHandling = useCallback((e: React.SyntheticEvent, id:number) => {
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
						listContent.map((data) => {

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
										<div onClick={(e) => popupHandling(e,  data.id,'accept')}><ButtonGeneral title={'승락'} buttontype={'small'} colortype={'sky'} /></div>
										<div style={{height: '0.5rem'}} />
										<div onClick={(e) => popupHandling(e,  data.id,'reject')}><ButtonGeneral title={'거절'} buttontype={'small'} /></div>
										<div style={{height: '0.5rem'}} />
										<div onClick={(e) => popupHandling(e,  data.id,'delete')}><ButtonGeneral title={'삭제'} buttontype={'small'} /></div>
									</div>
								</li>
							)
						})
					}
					<div className={'emptyDivHeight'} />
					<PaginationForPage
						currentPage={listState.currentPage}
						pageSize={requestContactInfoOnePageSize}
						pageBlockSize={requestContactInfoPageBlockSize}
						totalCounts={totalListCount}
						getData={getListContent}
						liststate={listState}
					/>
					<div style={{height: '1.5rem'}} />
				</div>
			</section>
			<div className={'comBG'} onClick={bgFunc} />
			{popDP && <Popup
				popMsg={popMsg}
				okFunc={(e) => requestHandling(e, contentID!)}
				bgFunc={(e) => popupClose(e, setPopDP)}
				cancelFunc={(e) => popupClose(e, setPopDP)}
				popupType={popType}
			/>}
		</>
	)
}

export default React.memo(RequestContactInfo)
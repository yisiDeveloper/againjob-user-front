import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {useNavigation} from '@hook'
import {ButtonGeneral, ButtonRound, PageTitle, Popup} from '@components'
import {commMessage, pageURL_Resume_Detail, pageURL_Resume_Register, resumeType} from '@env'
import {resumeData} from '../../_env/SampleData'
import {popupClose, popupOpen} from '@handler'
import './resume.css'
import RequestContactInfo from './RequestContactInfo'

function ResumeList() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL} = useNavigation()


	/****************************************************** contents initialization or definition ***************************************************/
	const [resumeContent, setResumeContent] = useState<resumeType[]>([])
	const listRef = useRef<any>([])
	// 공개여부를 계속 바꿀 수 있으려면 해당 상태값을 관리해야 한다.
	const [exposeFlag, setExposeFlag] = useState<object>({})
	// 이력서 삭제를 위한 confirm 팝업 창 display
	const [popDP, setPopDP] = useState<boolean>(false)
	// 연락처 공개 요청 팝업 display
	const [rqCtInfoPopDP, setRqCtInfoPopDP] = useState<boolean>(false)


	/****************************************************** Handling ***************************************************/
	/************************* 이력서를 가져오자 ****************************/
	const getResumeList = useCallback(() => {
		setResumeContent(resumeData)
		// 공개 비공개 값을 세팅한다.
		let tmpObject = {}
		resumeData.map((data) => {
			tmpObject = {...tmpObject, [data.id]: data.open}
		})
		setExposeFlag(tmpObject)
	},[exposeFlag])


	/************************* 이력서의 공개/비공개 여부를 변경 ****************************/
	const changeExposed = useCallback((e: React.MouseEvent<HTMLDivElement>, targetid: number) => {
		e.preventDefault()

		let tmpKeys = Object.keys(exposeFlag)
		let tmpValues = Object.values(exposeFlag)
		let newValue: boolean

		// 먼저 기존 데이터를 가져온다.
		for(let i=0; i<tmpKeys.length; i++) {
			if(tmpKeys[i] === targetid.toString()) {
				newValue = !tmpValues[i]
				break
			}
		}
		// 클릭했다는 의미는 기존 것을 바꾼다는 의미이므로
		setExposeFlag({...exposeFlag, [targetid]: newValue!})
		listRef.current[targetid].className = newValue! ? 'exposeOn' : 'exposeOff'

	},[exposeFlag])


	/************************* 팝업을 관리하자 ****************************/
	//targetid:이력서 id, type: 복사인지 삭제인지, delete: 삭제, copy: 복사
	// 	메시지
	const [popupMessage, setPopupMessage] = useState<object>({})
	const [popupType, setPopupType] = useState<string>()
	//  어떤 이력서를 복사 또는 삭제할 것인지를 구분하기 위함
	const [targetId, setTargetId] = useState<number>()
	//  어떤 작업을 할건지
	const [requestType, setRequestType] = useState<string>()

	const popupHandling = useCallback((e: React.MouseEvent, targetid:number, type: string) => {
		e.preventDefault()

		// 작업에 대한 세팅
		setTargetId(targetid)
		setRequestType(type)

		// 연락처 공개요청 팝업이라면...
		if(type==='contact') {
			setRqCtInfoPopDP(true)
		} else {
			// 	메시지 세팅
			let msgCode: string
			msgCode = (type==='delete') ? 'CONFIRM_DELETE' : 'CONFIRM_COPY'
			setPopupMessage(commMessage(msgCode))
			// 팝업 타입
			setPopupType('confirm')
			// 	 팝업 오픈
			popupOpen(e, setPopDP)
		}

	},[resumeContent, targetId, requestType])

	/************************* 특정 이력서를 복사 또는 삭제한다.****************************/
	const resumeHandling = useCallback((e: React.MouseEvent) => {
		e.preventDefault()

		// console.log('targetId', targetId)
		// console.log('requestType', requestType)

		popupClose(e, setPopDP)
		// 삭제일 경우

		// 복사일 경우

	},[resumeContent, targetId, requestType])


	useLayoutEffect(() => {
		getResumeList()
	},[])

	return (
		<main>
			<section className={'memberTitleArea'}>
				<PageTitle title={'이력서 관리'} />
				<div className={'memberTitleButton'}>
					<span style={{cursor: 'pointer'}} onClick={(e) => goToURL(e, pageURL_Resume_Register)}><ButtonGeneral
						title={'등록하기'}
						buttontype={'page'}
						colortype={''}
					/></span>
				</div>
			</section>
			<section className={'container'}>
				{
					resumeContent.map((data) => {

						let requestOpen = '연락처 공개요청 (' + data.requestCallOpen + ')'
						let classname = data.open ? 'exposeOn' : 'exposeOff'
						return (
							//
							<li key={data.id} className={'listRow'}>
								<div className={'listColumn'} onClick={(e) => goToURL(e, pageURL_Resume_Detail, {resumeID: data.id})}>
									<article className={'listSubjectArea'}>
										<span className={'listSubjectText'}>{data.title}</span>
									</article>
									<span className={'listColumnTitle'}>등록일</span>
									<div className={'emptyDivWidth'} />
									<span>{data.registerDate}</span>
									<div className={'listContentBar'} />
									<span className={'listColumnTitle'}>수정일</span>
									<div className={'emptyDivWidth'} />
									<span>{data.modifyDate}</span>
								</div>
								<div className={'listColumn'}>
									<div className={classname} ref={(e) => listRef.current[data.id] = e} onClick={(e) => changeExposed(e, data.id)} />
									<div style={{height: '0.2rem'}} />
									{data.requestCallOpen>0 ? <span onClick={(e) => popupHandling(e, data.id, 'contact')}><ButtonRound title={requestOpen} />
									</span> : <span><ButtonRound title={requestOpen} />
									</span>}
								</div>
								<div className={'emptyDivWidth'} />
								<div className={'listColumn'}>
									<div onClick={(e) => popupHandling(e, data.id, 'copy')}><ButtonGeneral title={'복사'} buttontype={''} /></div>
									<div style={{height: '0.5rem'}} />
									<div onClick={(e) => popupHandling(e, data.id, 'delete')}><ButtonGeneral title={'삭제'} buttontype={''} /></div>
								</div>
							</li>
						)
					})
				}
			</section>
			{popDP && <Popup
				popMsg={popupMessage}
				okFunc={(e) => resumeHandling(e)}
				cancelFunc={(e) => popupClose(e, setPopDP)}
				bgFunc={(e) => popupClose(e, setPopDP)}
				popupType={popupType}
			/>}
			{rqCtInfoPopDP && <RequestContactInfo
				targetId={targetId!}
				bgFunc={(e) => popupClose(e, setRqCtInfoPopDP)}
			/>}
		</main>
	)
}

export default React.memo(ResumeList)
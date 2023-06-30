import React, {useEffect, useState} from 'react'
import {useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {ButtonRound} from '@components'



function QnaDetail() {

	/****************************************************** common basic definition ***************************************************/
	const {propState} = useNavigation()
	console.log(propState)
	const [listState, ] = useState(propState.listState)

	/****************************************************** contents initialization or definition ***************************************************/

	/****************************************************** Handling ***************************************************/
	// 한번 만 실행되도록 하기 위함
	useEffect(() => {

	}, [])

	return (
		<main>
			<CsTitles currentMenu={'qna'} pageDetail={'qnaDetail'} pageState={listState} />
			<div className={'contentTitleArea'}>
				<div className={'contentTitle'}>
					기업회원은 휴대폰번호를 이용해서 로그인 할 수 없나요?
				</div>
				<div className={'contentTitleInfo'}>
					2023-04-01
				</div>
			</div>
			<div className={'emptyDivHeight'} />
			<div className={'contentTitleArea'}>
				<ButtonRound
					title='에러화면1.jpg'
					buttontype={'normal'}
				/>
				<div className={'emptyDivWidth'}/>
				<ButtonRound
					title='에러화면2.png'
					buttontype={'normal'}
				/>
			</div>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				<div dangerouslySetInnerHTML={{__html: 'AgainJob에서 서비스 추가 및 확대로 인해 이용약관과 개인정보처리방침에 변경이 있었습니다. 2023년 6월01일부터 시행되며, 약관에 동의하지 않으시면 사이트 이용이 불가합니다.<br />궁금하신 점은 help@againjob.co.kr로 문의해주세요.'}} />
			</section>
			<div className={'emptyDivHeight'} />
			<div className={'contentTitleArea'}>
				<div className={'contentTitle'}>안녕하세요 홍길동 고객님! 답변 드립니다.
				</div>
				<div className={'contentTitleInfo'}>
					2023-04-02
				</div>
			</div>
			<div className={'emptyDivHeight'} />
			<div className={'contentTitleArea'}>
				<ButtonRound
					title='예시화면1.jpg'
					buttontype={'normal'}
				/>
				<div className={'emptyDivWidth'}/>
				<ButtonRound
					title='예시화면2.png'
					buttontype={'normal'}
				/>
			</div>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				<div dangerouslySetInnerHTML={{__html: '먼저 사이트 이용에 불편을 끼쳐드려 대단히 죄송합니다..<br />궁금하신 점은 help@againjob.co.kr로 문의해주세요.'}} />
			</section>
		</main>
	)
}

export default React.memo(QnaDetail)
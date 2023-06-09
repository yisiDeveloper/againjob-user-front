import React, {useEffect, useState} from 'react'
import {useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {ButtonRound} from '@components'


interface NoticeDetailPropType {
}

function NoticeDetail({}: NoticeDetailPropType) {

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
			<CsTitles currentMenu={'notice'} pageDetail={'notice'} pageState={listState} />
			<section className={'pageTitleWrap'}>
				<div className={'pageTitleMultiArea'}>
					<div className={'contentTitle'}>
						이용약관 및 개인정보처리방침 변경 고지
					</div>
					<div className={'contentTitleInfo'}>
						2023-04-01
					</div>
				</div>
				<div className={'pageTitleContentArea'}>
					<ButtonRound
						title='개인정보처리방침_개정판.pdf'
						buttontype={'normal'}
					/>
					<div className={'emptyDivWidth'}/>
					<ButtonRound
						title='AgainJob이용약관_개정판.pdf'
						buttontype={'normal'}
					/>
				</div>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				AgainJob에서 서비스 추가 및 확대로 인해 이용약관과 개인정보처리방침에 변경이 있었습니다. 2023년 6월01일부터 시행되며, 약관에 동의하지 않으시면 사이트 이용이 불가합니다.<br />
				궁금하신 점은 help@againjob.co.kr로 문의해주세요.
			</section>
		</main>
	)
}

export default React.memo(NoticeDetail)
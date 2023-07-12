import React, {useEffect, useState} from 'react'
import {useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {ButtonRound} from '@components'

function FaqDetail() {

	/****************************************************** common basic definition ***************************************************/
	const {propState} = useNavigation()
	// console.log(propState)
	const [listState, ] = useState(propState.listState)

	/****************************************************** contents initialization or definition ***************************************************/

	/****************************************************** Handling ***************************************************/
	// 한번 만 실행되도록 하기 위함
	useEffect(() => {

	}, [])

	return (
		<main>
			<CsTitles currentMenu={'faq'} pageDetail={'faq'} pageState={listState} />
			<section className={'pageTitleWrap'}>
				<div className={'pageTitleMultiArea'}>
					<div className={'contentTitle'}>
						기업회원으로 가입하고 싶은데요. 휴대폰 번호로 할 수 없나요?
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
				휴대폰 번호 가입은 개인회원 전용입니다. 올해 상반기 중 기업회원도 휴대폰 번호로의 가입을 위해 서비스 업데이트가 예정되어 있습니다. 다만 일정이 정확히 정해진 것은 아니며, 일정이 정해지는데로 홈페이지  공지사항을 통해 공지할 수 있도록 하겠습니다.
			</section>
		</main>
	)
}

export default React.memo(FaqDetail)
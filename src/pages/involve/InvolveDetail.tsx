import React, {useEffect, useState} from 'react'
import {pageURL_Involve_List} from '@env'
import {useNavigation} from '@hook'
import {ButtonGeneral, ButtonRound, PageTitle} from '@components'


function InvolveDetail() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()
	const [listState, ] = useState(propState.listState)

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.


	/****************************************************** Handling ***************************************************/

	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
		// console.log('detailPage', listState)
	}, [])

	return (
		<main>
			<section className={'memberTitleArea'}>
				<PageTitle title={'참여 관리'} />
				<div className={'memberTitleButton'}>
					<span style={{cursor:'pointer'}} onClick={(e) => goToURL(e, pageURL_Involve_List, listState)}>
					<ButtonGeneral
						title={'목록'}
						buttontype={'page'}
						colortype={'pageList'}
					/></span>
					<div className={'emptyDivWidth'} />
					<span style={{cursor:'pointer'}}>
					<ButtonGeneral
						title={'참여종료'}
						buttontype={'page'}
						colortype={'disabled'}
					/></span>
					<div className={'emptyDivWidth'} />
					<span style={{cursor:'pointer'}}>
					<ButtonGeneral
						title={'취소완료'}
						buttontype={'page'}
						colortype={'disabled'}
					/></span>
					<div className={'emptyDivWidth'} />
					<span style={{cursor:'pointer'}}>
					<ButtonGeneral
						title={'참여취소'}
						buttontype={'page'}
						colortype={''}
					/></span>
				</div>
			</section>
			<section className={'contentTitleArea'}>
				<div className={'contentTitle'}>쇼핑몰 구축을 10여 차례 진행했습니다. 제가 최적입니다.</div>
			</section>
			<div className={'emptyDivHeight'} />
			{/*********************************** Project 정보 ***********************************/}
			<section className={'container containerTop containerFlex'}>
				<article className={'involveDetailProjectTitle contentBottomLine'}>
					소규모 쇼핑몰을 구축해주실 분을 찾고 있습니다.
				</article>
				<div className={'emptyDivHeight'} />
				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>예상금액</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>1,000만원</span>
				</article>
				<div className={'listContentBar'} />
				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>예상기간</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>90일</span>
				</article>
				<div className={'listContentBar'} />
				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>검토마감</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>2023-03-01</span>
				</article>

				<div className={'emptyDivHeight'} />

				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>참여금액</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>9000만원</span>
				</article>
				<div className={'listContentBar'} />
				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>참여기간</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>90일</span>
				</article>
				<div className={'listContentBar'} />
				<article style={{width: '29%', textAlign:'center'}}>
					<span className={'listColumnTitle'}>제안일자</span>
					<div className={'emptyDivWidth'} />
					<div className={'emptyDivWidth'} />
					<span>2023-02-25</span>
				</article>
			</section>
			<div className={'emptyDivHeight'} />
			{/*********************************** 제안 정보 ***********************************/}
			<section className={'container'}>
				<article className={'contentBottomLine involveContentPadding'}>
					<p>안녕하세요</p>
					<p>귀사의 소규모 쇼핑몰 구축 프로젝트에 지원합니다.</p>
					<p>저는 IT 경력 20년차의 Full Stack으로 기획부터 개발까지 모두 가능합니다.</p>
					<br />
					<p>귀사와 같이 소규모인 경우 기간과 퀄리티 그리고 완성도까지 확보할 수 있는 방안은 여러명의 프로젝트 인력보다 한 사람의 Full Stack을 뽑는것이 좋습니다.</p>
				</article>
				<div className={'contentBottomLine involveContentPadding'}>
					<article>
						<span className={'listColumnTitle'}>첨부한 이력서</span>
						<div className={'emptyDivWidth'} />
						<div className={'emptyDivWidth'} />
						<span>제가 FullStack 개발자 최고입니다.</span>
					</article>
					<div className={'emptyDivHeight'} />
					<article>
						<ButtonRound
							title={'포트폴리오_20230101.pdf'}
							buttontype={'file'}
						/>
						<div className={'emptyDivWidth'} />
						<div className={'emptyDivWidth'} />
						<ButtonRound
							title={'디자인시안.pdf'}
							buttontype={'file'}
						/>
					</article>
				</div>
				<div className={'involveContentPadding'}>
					<article className={'involveDetailProjectTitle'}>사전질문 / 답변</article>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<div className={'questionBg'}></div>
						<div className={'emptyDivWidth'} />
						<div className={'listColumnTitle'}>유사한 프로젝트를 진행하신 경험이 있나요?</div>
					</div>
					<div style={{height: '1rem'}} />
					<article>
						지난 30년간 쇼핑몰 뿐만 아니라 수많은 디지털 시스템 구축을 진행했습니다.
						전형적인 쇼핑몰은 총 10건, 쇼핑몰 기능이 포함된 포털이 10건 있습니다.<br />
						지난 30년간 쇼핑몰 뿐만 아니라 수많은 디지털 시스템 구축을 진행했습니다.
					</article>
				</div>
			</section>
		</main>
	)
}

export default React.memo(InvolveDetail)
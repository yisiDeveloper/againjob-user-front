import React, {useCallback} from 'react'
import styled from 'styled-components'
import './main.css'
import {ArrowMainMore, HyundaiLogo, KyoboLogo, MgLogo, PngLogo} from '@assets'
import {useNavigate} from 'react-router-dom'
import {ButtonRound_ForMainTag, IconRound_ForMain} from '@components'

function Main() {

	/****************************************************** 공통 정의 ***************************************************/
	const navigate = useNavigate()
	// 최상단 광고 팝업 창의 노출여부

	// 링크 관리
	const linkHandler = useCallback(() => {
		alert('클릭')
	},[])

	const checkSearchInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {

	},[])



	return (
		<main className='mainContainer'>
			{/*************************** 검색영역 *************************/}
			<SearchArea>
				<div className={'searchInput'}>
					<input type='text' name='totalSearch' max='100' placeholder='모든 정보를 한번에 찾아볼 수 있어요!' className='totalSearch' onChange={checkSearchInput} />
					<div className={'readingGlasses cursorPointer'} />
				</div>
				<div className={'annArea'}>
					<div className={'annTitle'}>알려드립니다.</div>
					<div className={'annMore cursorPointer'} onClick={linkHandler}></div>
					<div className={'annContent'}>AgainJob 그랜드 오픈 이벤트를 진행합니다. 선착순 300명입니다.</div>
				</div>
			</SearchArea>

			{/*************************** 태그 *************************/}
			<div className='sectionTitleArea'>Top 태그</div>
			<TagArea>
				<div className={'tagRow'}>
					<div className={'tagTitle'}>채용</div>
					<div>
						{/* 전체 통틀어 가장 많이 입력된 태그 , focus: 최근 한달간 가장 많이 입력된 Tag */}
						<ButtonRound_ForMainTag title={'Project Management'} buttontype={'focus'} />
						<ButtonRound_ForMainTag title={'정보통신기술사'} buttontype={'normal'} />
						<ButtonRound_ForMainTag title={'삼성전자 기술사'} buttontype={'normal'} />
						<ButtonRound_ForMainTag title={'가장 많이 입력된 태그'} buttontype={'focus'} />
						<ButtonRound_ForMainTag title={'AgainJob 개발자'} buttontype={'normal'} />
						<ButtonRound_ForMainTag title={'주식회사 풍산 기술자'} buttontype={'normal'} />
						<ButtonRound_ForMainTag title={'삼성전자 기술사'} buttontype={'normal'} />
					</div>
				</div>
				<div className={'tagRow'}>
					<div className={'tagTitle'}>인재</div>
					<div>
						<ButtonRound_ForMainTag title={'FullStack Developer'} buttontype={'normal'} />
						<ButtonRound_ForMainTag title={'PMP PRINCE2'} buttontype={'focus'} />
						<ButtonRound_ForMainTag title={'20년 경력의 PMO'} buttontype={'normal'} />
					</div>
				</div>
				<div className={'tagRow'}>
					<div className={'tagTitle'}>일거리</div>
					<ButtonRound_ForMainTag title={'회사 홈페이지 Project'} buttontype={'focus'} />
					<ButtonRound_ForMainTag title={'쇼핑몰 호스트'} buttontype={'normal'} />
				</div>
			</TagArea>

			{/*************************** 채용정보 *************************/}
			<div style={{marginBottom: '1.5rem'}}>
				<span className={'sectionTitleArea'}>최신 채용정보</span>
				<span className='mainMore cursorPointer' onClick={linkHandler}><img src={ArrowMainMore} /></span>
			</div>
			<RecruitArea>
				<div className={'recruitCell'}>
					<div className={'companyLogo'}><img src={HyundaiLogo} /></div>
					<div className={'recruitCoName'}>(주)현대자동차</div>
					<div className={'recruitName'}>현대자동차 게임처인저 경영 연구 채용</div>
					<div className={'iconArea'}>
						<div><IconRound_ForMain buttontype={'focus'} title={'마감임박'} /></div>
						<div className={'applyPeriod'}>2023-01-01 ~ 2023-03-31</div>
					</div>
				</div>
				<div className={'recruitCell'}>
					<div className={'companyLogo'}><img src={PngLogo} /></div>
					<div className={'recruitCoName'}>한국피앤지판매(유)</div>
					<div className={'recruitName'}>[한국피앤지] P&G Korea 2023 Summer Internship 채용</div>
					<div className={'iconArea'}>
						<div><IconRound_ForMain buttontype={'normal'} title={'2일 남음'} /></div>
						<div className={'applyPeriod'}>2023-01-01 ~ 2023-03-31</div>
					</div>
				</div>
				<div className={'recruitCell'}>
					<div className={'companyLogo'}><img src={MgLogo} /></div>
					<div className={'recruitCoName'}>새마을금고중앙회</div>
					<div className={'recruitName'}>2023년 상반기 새마을금고중앙회 일반직 신입직원 공채</div>
					<div className={'iconArea'}>
						<div><IconRound_ForMain buttontype={'normal'} title={'7일 남음'} /></div>
						<div className={'applyPeriod'}>2023-01-01 ~ 2023-03-31</div>
					</div>
				</div>
				<div className={'recruitCell'}>
					<div className={'companyLogo'}><img src={KyoboLogo} /></div>
					<div className={'recruitCoName'}>교보생명</div>
					<div className={'recruitName'}>2023년 상반기 신입사원 채용(일반/보훈) 모집 공고</div>
					<div className={'iconArea'}>
						<div><IconRound_ForMain buttontype={'normal'} title={'15일 남음'} /></div>
						<div className={'applyPeriod'}>2023-01-01 ~ 2023-03-31</div>
					</div>
				</div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
			</RecruitArea>

			{/*************************** 일거리정보 *************************/}
			<div style={{marginBottom: '1.5rem'}}>
				<span className='sectionTitleArea'>최신 일거리정보</span>
				<span className='mainMore cursorPointer' onClick={linkHandler}><img src={ArrowMainMore} /></span>
			</div>
			<WorkArea>
				<div className={'recruitCell'}>
					<div className={'workName'}>회사 홈페이지를 제작하고자 합니다.&nbsp;<IconRound_ForMain buttontype={'normal'} title={'2일 남음'} /></div>
					<div className={'workIcon'}>
						<IconRound_ForMain buttontype={'work'} title={'정보통신 기술사'} />&nbsp;
						<IconRound_ForMain buttontype={'work'} title={'Project Manager'} />
					</div>
					<div className={'workTableArea'}>
						<table className={'workTable'}>
							<tbody>
								<tr>
									<td>지역</td>
									<td>서울특별시</td>
								</tr>
								<tr>
									<td>접수기간</td>
									<td>2023-01-01 ~ 2023-03-01</td>
								</tr>
								<tr>
									<td>수행기간</td>
									<td>2023-01-01 ~ 2023-03-01</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
				<div className={'recruitCell'}></div>
			</WorkArea>

			{/*************************** 인재정보 *************************/}
			<div style={{marginBottom: '1.5rem'}}>
				<span className='sectionTitleArea'>최신 인재정보</span>
				<span className='mainMore cursorPointer' onClick={linkHandler}><img src={ArrowMainMore} /></span>
			</div>
			<TalentArea>
				<div className={'talentCell'}>
					<div className={'talentTitle'}>
						20년 Project Manager 경력과 10년 개발 경력의 FullStack 입니다.
					</div>
					<div className={'talentTag'}>
						<IconRound_ForMain buttontype={'sky'} title={'정보통신 기술사'} />&nbsp;
						<IconRound_ForMain buttontype={'talent'} title={'Project Manager'} />&nbsp;
						<IconRound_ForMain buttontype={'sky'} title={'20년 경력'} />&nbsp;
						<IconRound_ForMain buttontype={'talent'} title={'PMO수행 가능'} />&nbsp;
						<IconRound_ForMain buttontype={'talent'} title={'Business Analysis'} />&nbsp;
					</div>
				</div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
				<div className={'talentCell'}></div>
			</TalentArea>
		</main>
	)
}

/****************************************** 공통 영역 **********************************************/
const SectionDefault = styled.section`
	background-color: var(--bgContentBasicBgColor);
	border-radius: var(--radiusBasic);
	margin-bottom: 3rem;
`

/****************************************** 검색영역 **********************************************/
const SearchArea = styled(SectionDefault)`
	//border: 1px solid yellow;
	background-color: transparent;
	display: flex;
	align-items: center;
`
/****************************************** Tag 영역 **********************************************/
const TagArea = styled(SectionDefault)`
	//border: 1px solid dodgerblue;
`
/****************************************** 채용정보 영역 **********************************************/
const RecruitArea = styled(SectionDefault)`
	//border: 1px solid yellowgreen;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
`
/****************************************** 일거리 정보 영역 **********************************************/
const WorkArea = styled(SectionDefault)`
	//border: 1px solid mediumpurple;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
`
/****************************************** 인재정보 영역 **********************************************/
const TalentArea = styled(SectionDefault)`
	//border: 1px solid skyblue;
	margin-bottom: 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
`


export default React.memo(Main)
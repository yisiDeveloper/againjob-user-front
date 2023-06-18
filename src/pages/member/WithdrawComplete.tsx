import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {goToURL} from '@handler'
import {
	pageURL_ERROR_NotiForCS,
	pageURL_Sign_ChoiceClassify
} from '@env'
import {ButtonGeneral} from '@components'

function WithdrawComplete() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()
	const location = useLocation()
	const propState = {...location.state}


	/****************************************************** contents initialization or definition ***************************************************/


	/****************************************************** Handling ***************************************************/

	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
		// 값을 확인하여 없는 경우 에러를 발생시킨다.
		if(!propState.name) {
			// navigate(pageURL_ERROR_NotiForCS, {replace: true, state:{errorCode:'NOT_NORMAL_CONNECT'}})
		}
	},[])

	return (
		<div className={'signContainer'}>
			<section>
				<div className={'signEndUserName'}>{propState.name} 님!</div>
				<div className={'signEndResult'}>
					그동안 AgainJob 서비스를<br />이용해 주셔야 감사합니다.
				</div>
				<div className={'signEndInfo'}>
					{propState.name}님과의 인연이 <br />다시 한번 닿기를 고대하겠습니다.
				</div>
				<div className={'signEndBtnArea'}>
					<div
						onClick={(e) => goToURL(e, '/', navigate)}
					>
						<ButtonGeneral
							title={'홈으로 가기'}
							buttontype={'middle'}
						/>
					</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div
						onClick={(e) => goToURL(e, pageURL_Sign_ChoiceClassify, navigate)}
					>
						<ButtonGeneral
							title={'회원가입'}
							buttontype={'middle'}
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default React.memo(WithdrawComplete)
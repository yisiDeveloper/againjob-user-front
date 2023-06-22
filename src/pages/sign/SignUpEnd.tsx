import React, {useEffect} from 'react'
import {pageURL_ERROR_NotiForCS, pageURL_Sign_Login} from '@env'
import {ButtonGeneral} from '@components'
import {useNavigation} from '@hook'

function SignUpEnd() {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/



	/****************************************************** Handling ***************************************************/

	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
		// 값을 확인하여 없는 경우 에러를 발생시킨다.
		if(!propState.name) {
			navigate(pageURL_ERROR_NotiForCS, {replace: true, state:{errorCode:'NOT_NORMAL_CONNECT'}})
		}
	},[])

	return (
		<div className={'signContainer'}>
			<section>
				<div className={'signEndUserName'}>{propState.name} 님!</div>
				<div className={'signEndResult'}>회원가입이 완료됐습니다.</div>
				<div className={'signEndInfo'}>로그인 후 모든 서비스를 이용하실 수 있습니다.</div>
				<div className={'signEndBtnArea'}>
					<div
						 onClick={(e) => goToURL(e, '/')}
					>
						<ButtonGeneral
							title={'홈으로 가기'}
							buttontype={'middle'}
							colortype={''}
						/>
					</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div
						 onClick={(e) => goToURL(e, pageURL_Sign_Login)}
					>
						<ButtonGeneral
							title={'로그인'}
							buttontype={'middle'}
							colortype={''}
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default React.memo(SignUpEnd)
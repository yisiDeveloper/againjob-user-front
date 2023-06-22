import React from 'react'
import './sign.css'
import {ButtonGeneral, RegisterLoginTitle} from '@components'
import {
	pageURL_Sign_Login,
	pageURL_Sign_PE_AgreePolicy
} from '@env'
import {useNavigation} from '@hook'

function Classify() {

	/****************************************************** common basic definition ***************************************************/
	const { goToURL } = useNavigation()

	return (
		<div className={'signContainer'}>
			<section>
				<div className={'signTitleArea'}>
					<RegisterLoginTitle title={'회원가입'} />
				</div>
				<div className={'classifyInfo'}>

					개인정보를 직접 입력하여 가입하시면<br />
					휴대전화번호 또는 이메일로 로그인 하실 수 있습니다.<br />
					<br />
					소셜 계정으로도 가입할 수 있습니다.
				</div>
				<div onClick={(e) => goToURL(e, pageURL_Sign_PE_AgreePolicy) } style={{marginBottom: '2rem'}}>
					<ButtonGeneral buttontype={'full'} title={'휴대전화번호와 이메일로 회원가입'} />
				</div>
				<div className={'naverLogin'}>네이버로 회원가입</div>
				<div className={'kakaoLogin'}>카카오로 회원가입</div>
				<div className={'goLogin'}>
					이미 회원이신가요? <span style={{textDecoration: 'underline', fontWeight:'bold', cursor: 'pointer'}} onClick={(e) => goToURL(e,pageURL_Sign_Login)}>로그인하기</span>
				</div>
			</section>
		</div>
	)
}

export default React.memo(Classify)
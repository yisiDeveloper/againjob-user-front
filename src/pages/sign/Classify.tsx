import React from 'react'
import './sign.css'
import {ButtonGeneral, RegisterLoginTitle} from '@components'
import {pageURL_Sign_ChoiceChannel, pageURL_Sign_CO_AgreePolicy, pageURL_Sign_Login} from '@env'
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
					개인회원은 이메일 또는 SNS 계정으로 가입할 수 있으며,<br />기업회원은 이메일로만 가입 가능합니다.
				</div>
				<div onClick={(e) => goToURL(e, pageURL_Sign_ChoiceChannel) } style={{marginBottom: '2rem'}}>
					<ButtonGeneral buttontype={'full'} title={'개인회원'} />
				</div>
				<div onClick={(e) => goToURL(e, pageURL_Sign_CO_AgreePolicy)} style={{marginBottom: '5rem'}}>
					<ButtonGeneral buttontype={'full'} title={'기업회원'} />
				</div>
				<div className={'goLogin'}>
					이미 회원이신가요? <span style={{textDecoration: 'underline', fontWeight:'bold', cursor: 'pointer'}} onClick={(e) => goToURL(e,pageURL_Sign_Login)}>로그인하기</span>
				</div>
			</section>
		</div>
	)
}

export default React.memo(Classify)
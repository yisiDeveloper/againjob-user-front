import React, {useCallback, useRef, useState} from 'react'
import {Alert, ButtonGeneral, CustomCheckBox, InputWithAlert, RegistLoginTitle} from '@components'
import './sign.css'
import styled from 'styled-components'
import {pageURL_Sign_ChoiceChannel} from '@env'
import {goToURL} from '@handler'
import {useNavigate} from 'react-router-dom'

function Login() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()

	/****************************************************** contents initialization or definition ***************************************************/
	const [values, setValues] = useState({userID: '', userPwd: '', saveId: false})

	const [message, setMessage] = useState('')
	const [messageDP, setMessageDP] = useState(false)

	/****************************************************** Handling ***************************************************/
	const changeValues = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		let {name, value} = e.target
		setValues({...values, [name]: value})
	},[values])

	const loginSubmit = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		if(values.userID.length<5 || values.userPwd.length<8) {
			setMessage('아이디와 비밀번호를 확인해주세요.')
			setMessageDP(true)
		} else {
			console.log(values)
			setMessage('')
			setMessageDP(false)
			alert('로그인 하겠습니다.')
		}

	},[values, message, messageDP])


	const tagRef = useRef(null)

	return (
		<div className={'signContainer'}>
			<section>
				<form name={'loginForm'}>
					<div className={'signTitleArea'}>
						<RegistLoginTitle title={'로그인'} />
					</div>
					<div className={'emptyDivHeight'} />
					<div>
						<InputWithAlert
							type={'text'}
							title={'아이디'}
							titleDP={true}
							placeholder={'휴대전화번호 또는 이메일 주소를 입력해주세요.'}
							max={50}
							name={'userID'}
							onchange={changeValues}
						/>
					</div>
					<div className={'emptyDivHeight'} />
					<div>
						<InputWithAlert
							type={'password'}
							title={'비밀번호'}
							titleDP={true}
							placeholder={'비밀번호를 입력해주세요.'}
							max={20}
							name={'userPwd'}
							onchange={changeValues}
						/>
					</div>
					<Alert
						title={message}
						alertdisplay={messageDP}
					/>
					<div className={'emptyDivHeight'} />
					<div onClick={loginSubmit} style={{marginBottom: '1rem'}}>
						<ButtonGeneral buttontype={'full'} title={'로그인'} />
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomCheckBox name={'saveId'} title={'아이디저장'} defaultFlag={false} titleType={'loginForm'} onChangeHandler={changeValues} />
					</div>
					<div className={'loginSubMenuArea'}>
						<div className={'loginSubMenu'}>아이디 찾기</div>
						<SubMenuBar />
						<div className={'loginSubMenu'}>비밀번호 찾기</div>
						<SubMenuBar />
						<div onClick={(e) => goToURL(e, pageURL_Sign_ChoiceChannel, navigate)} className={'loginSubMenu'}>회원가입</div>
					</div>
					<div className={'naverLogin'}>네이버 로그인</div>
					<div className={'kakaoLogin'}>카카오 로그인</div>
				</form>
			</section>
		</div>
	)
}

const SubMenuBar = styled.div`
	background-color: var(--bgBarTypeLine);
	width: 0.05rem;
	height: 1rem;
`

export default React.memo(Login)
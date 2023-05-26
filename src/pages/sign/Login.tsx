import React, {useCallback, useRef} from 'react'
import {ButtonGeneral, CustomCheckBox, InputWithTitle, RegistLoginTitle} from '@components'
import './sign.css'
import styled from 'styled-components'
import { useForm } from '@handler'
import SignValidate from './SignValidate'

function Login() {

	/****************************************************** common basic definition ***************************************************/


	/****************************************************** contents value, controller definition ***************************************************/
	const loginSubmit = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		alert('submit')

		console.log(values);
		// let result = await formSubmit('', values, 'POST' )
		// alert(result);
	},[])


	// 페이지 Form 내에 모든 값들을 정의
	const initialValues = {
			userID: '',
			userPwd: '',
			saveId: ''
		}

	// 각종 핸들러를 가져온다.
	const {
		values, inputHandler, checkBoxHandler
	} = useForm({
		initialValues: initialValues,
		validate: SignValidate
	})

	const tagRef = useRef(null)

	return (
		<div className={'signContainer'}>
			<section>
				<form name={'loginForm'}>
					<div className={'signTitleArea'}>
						<RegistLoginTitle title={'로그인'} />
					</div>
					<div style={{marginBottom: '3rem'}}>
						<InputWithTitle
							type={'text'}
							title={'아이디'}
							placeholder={'휴대전화번호 또는 이메일 주소를 입력해주세요.'}
							max={50}
							name={'userID'}
							onchange={inputHandler}
						/>
					</div>
					<div style={{marginBottom: '3rem'}}>
						<InputWithTitle
							type={'password'}
							title={'비밀번호'}
							placeholder={'비밀번호를 입력해주세요.'}
							max={20}
							name={'userPwd'}
							onchange={inputHandler}
						/>
					</div>
					<div className={'alertArea alert'} style={{textAlign:'center'}}>
						아이디 또는 비밀번호를 확인해주세요.
					</div>
					<div onClick={loginSubmit} style={{marginBottom: '1rem'}}>
						<ButtonGeneral buttontype={'full'} title={'로그인'} />
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomCheckBox name={'saveId'} title={'아이디저장'} defaultFlag={false} titleType={'loginForm'} onChangeHandler={checkBoxHandler} tagRef={tagRef} />
					</div>
					<div className={'loginSubMenuArea'}>
						<div className={'loginSubMenu'}>아이디 찾기</div>
						<SubMenuBar />
						<div className={'loginSubMenu'}>비밀번호 찾기</div>
						<SubMenuBar />
						<div className={'loginSubMenu'}>회원가입</div>
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
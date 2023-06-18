import React, {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {findKeyInObjectByValue, findValueInObject, goToURL, useForm} from '@handler'
import {
	commMessage,
	memberMessage,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_PE_FindID
} from '@env'
import {Alert, ButtonGeneral, Dropdown, InfoAlert, InputWithAlert, RegistLoginTitle} from '@components'

function ChangeTempPwd() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()

	/****************************************************** contents initialization or definition ***************************************************/
		// 찾기 결과가 없는 경우를 위한 Error Message DP
	const [changeTempPassowordResultDP, setChangeTempPassowordResultDP] = useState<boolean>(false)


	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		tempPassword: '',
		newPassword: '',
		newPasswordConfirm: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		tempPassword: '',
		newPassword: '',
		newPasswordConfirm: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

		// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()

		// 비밀번호와 비밀번호 확인이 다른 경우를 대비
		if(values.newPassword !== values.newPasswordConfirm) {
			// console.log('패스워드가 틀리니 검증하자')
			setErrorMessage(e, 'newPasswordConfirm',memberMessage('NOT_CONFIRM_PASSWORD').message)
			return false
		}

		// 최종 확인
		if(!findValueInObject(errors, true)) {
			setChangeTempPassowordResultDP(true)
		} else {
			// 에러가 난 필드를 찾아 해당 필드에 에러 메시지를 뿌린다.
			let findedKey = findKeyInObjectByValue(errors, true)
			console.log(findedKey)
			if(findedKey) {
				setErrorMessage(e, findedKey, commMessage('INVALID_INPUT_PARAM').message)
			}
		}

	}, [errors,values])


	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
	}, [])

	return (
		<div className={'signContainer'}>
			<section className={'infoArea'}>
				<article className={'signTitleArea'}>
					<RegistLoginTitle title={'임시 비밀번호 변경'} />
				</article>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'임시 비밀번호'}
					titleDP={true}
					placeholder={'임시 비밀번호를 입력해주세요.'}
					name={'tempPassword'}
					max={20}
					type={'password'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '임시 비밀번호는')}
					value={values?.tempPassword}
					message={messages?.tempPassword}
				/>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'새로운 비밀번호'}
					titleDP={true}
					placeholder={'새로운 비밀번호를 입력해주세요.'}
					name={'newPassword'}
					max={20}
					type={'password'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '새로운 비밀번호는')}
					value={values?.newPassword}
					message={messages?.newPassword}
				/>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'새로운 비밀번호 확인'}
					titleDP={true}
					placeholder={'새로운 비밀번호를 한번 더 입력해주세요.'}
					name={'newPasswordConfirm'}
					max={20}
					type={'password'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '새로운 비밀번호 확인은')}
					value={values?.newPasswordConfirm}
					message={messages.newPasswordConfirm}
				/>
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center', height:'4rem'}}>
					<Alert
						title={memberMessage('TEMP_PASSWORD_FAILED').message}
						alertdisplay={changeTempPassowordResultDP}
					/>
				</div>
				<div style={{textAlign:'center'}}>
					<div style={{marginBottom: '2rem', display:'inline-block'}} onClick={(e) => goToURL(e, '/', navigate)}>
						<ButtonGeneral buttontype={'middle'} title={'취소'} colortype={'cancel'} />
					</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div style={{marginBottom: '2rem', display: 'inline-block'}}
						 onClick={submitHandler}
					>
						<ButtonGeneral buttontype={'middle'} title={'확인'} />
					</div>
				</div>

				<InfoAlert messageCode={'CHANGE_TEMP_PASSWORD'} />
			</section>
		</div>
	)
}

export default React.memo(ChangeTempPwd)
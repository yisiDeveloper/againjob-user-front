import React, {useCallback, useEffect, useState} from 'react'
import {findKeyInObjectByValue, findValueInObject} from '@handler'
import {
	commMessage,
	memberMessage,
	pageURL_Sign_ChoiceClassify, pageURL_Sign_CO_FindID,
	pageURL_Sign_PE_FindPwd
} from '@env'
import {Alert, ButtonGeneral, Dropdown, InfoAlert, InputWithAlert, RegisterLoginTitle, TabMenu} from '@components'
import {useForm, useNavigation} from '@hook'

function CoFindPwd() {

	/****************************************************** common basic definition ***************************************************/
	const { goToURL } = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
		// 찾기 결과가 없는 경우를 위한 Error Message DP
	const [findIDResultFailDP, setFindIDResultFailDP] = useState<boolean>(false)


	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		coBusinessNo: '',
		userEmail: '',
		mobileNumber1: '010',
		mobileNumber2: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		coBusinessNo: '',
		userEmail: '',
		mobileNumber2: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage,
		changeHandler
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

		// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
			e.preventDefault()

			// 최종 확인
			if(!findValueInObject(errors, true)) {
				setFindIDResultFailDP(true)
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
					<RegisterLoginTitle title={'비밀번호 찾기'} />
				</article>
				<div>
					<div className={'tabMenu'} onClick={(e) => goToURL(e, pageURL_Sign_PE_FindPwd)}><TabMenu title={'개인회원'} focuson={false} /></div>
					<div className={'tabMenu'}><TabMenu title={'기업회원'} focuson={true} /></div>
				</div>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'이메일'}
					titleDP={true}
					placeholder={'이메일 주소를 입력해주세요.'}
					name={'userEmail'}
					max={100}
					type={'text'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 10, 'email')}
					value={values?.userEmail}
					message={messages.userEmail}
				/>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'사업자등록번호'}
					titleDP={true}
					placeholder={'사업자등록번호를 입력해주세요.'}
					name={'coBusinessNo'}
					max={10}
					type={'text'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 10, 'number','사업자등록번호는')}
					value={values?.coBusinessNo}
					message={messages.coBusinessNo}
				/>
				<div className={'emptyDivHeight'} />
				<div className={'mobileArea'}>
					<div style={{width:'12rem'}}>
						<Dropdown
							title={'휴대전화번호'}
							Options={[{id: '010',title: '010'},{id: '011', title: '011'}, {id: '017', title: '017'}]}
							name={'mobileNumber1'}
							changeFunc={changeHandler}
							defaultValue={'010'}
						/>
					</div>
					<div className={'hyphen'}>-</div>
					<div style={{width: '28rem'}}>
						<InputWithAlert
							title={''}
							titleDP={true}
							placeholder={'12341234'}
							name={'mobileNumber2'}
							max={8}
							type={'text'}
							onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 7, 'number','휴대전화번호는')}
						/>
					</div>
				</div>
				<Alert
					title={messages?.mobileNumber2}
					alertdisplay={errors?.mobileNumber2}
				/>
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center', height:'4rem'}}>
					<Alert
						title={memberMessage('FIND_ACCOUNT_FAILED').message}
						alertdisplay={findIDResultFailDP}
					/>
				</div>
				<div style={{marginBottom: '1.5rem'}} onClick={submitHandler}>
					<ButtonGeneral buttontype={'full'} title={'이메일로 전송'} />
				</div>
				<div style={{marginBottom: '2rem'}}
					 onClick={(e) => goToURL(e, pageURL_Sign_ChoiceClassify)}
				>
					<ButtonGeneral buttontype={'full'} title={'회원가입'} />
				</div>
				<InfoAlert messageCode={'CO_FINDPWD_INFO'} />
			</section>
		</div>
	)
}

export default React.memo(CoFindPwd)
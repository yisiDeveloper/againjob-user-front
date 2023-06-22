import React, {useCallback, useEffect, useState} from 'react'
import {ButtonGeneral, InfoAlert, InputWithAlert, PageTitle, TabMenu} from '@components'
import {useForm, useNavigation} from '@hook'
import {commMessage} from '@env'


interface NewsletterPropType {
	// bgFunc: (e: React.MouseEvent) => void,
	okFunc: Function,
	closeSetter: React.Dispatch<React.SetStateAction<boolean>>
	// closeSetter: React.Dispatch<React.SetStateAction<boolean>>
}

function Newsletter({
	okFunc,
	closeSetter
}: NewsletterPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 현재 진행 형태 deny: 해지, 그외: 등록
	const [registerType, setRegisterType] = useState<string>('')
	// 메뉴 focus 형태
	const [menuType, setMenuType] = useState<boolean[]>([true, false])

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			userEmail: ''
		}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		userEmail: ''
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

		if(!errors.userEmail) {
			if(registerType==='deny') {
				closeSetter(false)
				okFunc(e, 'denied')
			} else {
				closeSetter(false)
				okFunc(e, 'register')
			}
		} else {
			setErrorMessage(e, 'userEmail' ,commMessage('INVALID_INPUT_PARAM').message)
		}
	}, [errors, menuType])

	// 해지하기 또는 신청하기로 변경
	const changeMenu = useCallback((e: React.SyntheticEvent, type:string) => {
		e.preventDefault()
		if(type ==='deny') {
			setMenuType([false, true])
		} else {
			setMenuType([true, false])
		}
		setRegisterType(type)
	},[menuType])

	useEffect(() => {
		if(!propState.type) {
			setRegisterType(propState.type)
			if(propState.type ==='deny') {
				setMenuType([false, true])
			} else {
				setMenuType([true, false])
			}
		}
	},[])

	return (
		<>
			<section className={'contentPopupWrap'} style={{width: '50rem'}}>
				<div className={'contentPopupHead'}>
					<div className={'contentPopupTitle'}><PageTitle title={'뉴스레터 신청'} /></div>
					<div onClick={() => closeSetter(false)} className={'contentPopupClose'}></div>
				</div>
				<article className={'contentPopupContent'}>
					<div className={'tabMenuArea'}>
						<div className={'tabMenu'} onClick={(e) => changeMenu(e,'regist')}><TabMenu title={'신청하기'} focuson={menuType[0]} /></div>
						<div className={'tabMenu'} onClick={(e)=>changeMenu(e, 'deny')}><TabMenu title={'해지하기'} focuson={menuType[1]} /></div>
					</div>
					<div className={'emptyDivHeight'} />
					<InputWithAlert
						title={'이메일주소'}
						titleDP={true}
						placeholder={'이메일 주소를 입려해주세요.'}
						name={'userEmail'}
						max={100}
						type={'text'}
						onchange={(e) => inputHandler(e, 10, 'email', '이메일 주소는 ')}
						value={values.userEmail}
						message={messages.userEmail}
					/>
					<div className={'emptyDivHeight'} />
					<InfoAlert messageCode={'NEWSLETTER_INFO'}/>
					<div className={'emptyDivHeight'} />
					<div style={{textAlign:'center'}} onClick={submitHandler}>
						<ButtonGeneral
							title={'확인'}
							buttontype={'middle'}
						/>
					</div>
				</article>
			</section>
			<div className={'comBG'} onClick={() => closeSetter(false)} />
		</>
	)
}

export default React.memo(Newsletter)
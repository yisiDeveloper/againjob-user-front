import React, {useCallback, useRef, useState} from 'react'
import '../sign/sign.css'
import {Alert, ButtonGeneral, CustomCheckBox, RegistLoginTitle} from '@components'
import {useNavigate} from 'react-router-dom'
import {goToURL, findValueInObject, makeTheValue, useForm} from '@handler'
import {memberMessage} from '@env'
import {pageURL_Member_WithdrawComplete} from '../../_env/pageURL'


function WithdrawPolicy() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()

	/****************************************************** 페이지 초기 값 세팅 ***************************************************/
	const [agreeConfirm, setAgreeConfirm] = useState(false)
	const [alertDP, setAlertDP] = useState(false)

	/****************************************************** Handler ***************************************************/
	const checkBoxHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		let checked = e.target.checked
		setAgreeConfirm(checked)
		setAlertDP(!checked)

	},[agreeConfirm])

	/**************************** submit handler *******************/
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()
		// 약관 동의 체크
		!agreeConfirm ? setAlertDP(true) : goToURL(e,pageURL_Member_WithdrawComplete, navigate)
	},[agreeConfirm])


	return (
		<div className={'signContainer'}>
			<section className={'policyArea'}>
				<div className={'signTitleArea'}>
					<RegistLoginTitle title={'회원탈퇴'} />
				</div>
				<div className={'policyTitle'}>
					탈퇴약관 동의
				</div>
				<article className={'policyContent'}>
					<p>주식회사 XXX(이하"회사")는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고 있으며, ‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다. 회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다. “개인정보처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다. 본 개인정보처리방침은 회사가 제공하는 XXX계정 기반의 서비스(이하 ‘서비스'라 함)에 적용됩니다.<br />
						서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.</p>
					<p>[XXX계정]필수이메일, 비밀번호, 이름(닉네임), 프로필사진, 친구목록, 전화번호(이용자의 경우에 한함), 연락처, 서비스 이용내역, 서비스 내 구매 및 결제 내역<br />
						선택생년월일, 성별, 배송지정보(수령인명, 배송지 주소, 전화번호)<br />
						[본인인증 시]이름, 성별, 생년월일, 휴대폰번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI))<br />
						[법정대리인 동의 시]법정대리인 정보(이름, 성별, 생년월일, 휴대폰번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI))<br />
						[유료서비스 이용 시]신용카드 결제 시: 카드번호(일부), 카드사명 등 휴대전화번호 결제 시: 휴대전화번호, 결제승인번호 등 계좌이체 시: 예금주명, 계좌번호, 계좌은행 등 상품권 이용 시: 상품권 번호, 해당 사이트 아이디<br />
						[환불처리 시]계좌은행, 계좌번호, 예금주명, 이메일<br />
						[현금영수증 발행 시]휴대폰번호, 현금영수증 카드번호<br />
						<br />
						•일부 서비스에서는 특화된 여러 기능들을 제공하기 위해 ‘XXX계정’에서 공통으로 수집하는 정보 이외에 이용자에게 동의를 받고 추가적인 개인정보를 수집할 수 있습니다.필수정보란? : 해당 서비스의 본질적 기능을 수행하기 위한 정보<br />
						<br />
						•선택정보란? : 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보 (선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은 없습니다.)<br />
						서비스에서 별도로 수집하는 개인정보 항목 자세히 보기 고객상담을 위해 추가 수집하는 개인정보 항목 자세히 보기개인정보를 수집하는 방법은 다음과 같습니다.개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.<br />
						•회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우<br />
						•제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우<br />
						•고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등<br />
						•온·오프라인에서 진행되는 이벤트/행사 등 참여<br />
						서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디, 폰기종, 단말기 모델명), IP주소, 쿠키, 방문일시, 부정이용기록, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.<br />
						서비스 간 제휴, 연계 등으로 제3자로부터 개인정보를 제공받고 있습니다.</p>
				</article>
				<div style={{marginBottom: '4rem'}}>
					<CustomCheckBox name={'withdrawpolicy'} title={'회원탈퇴약관에 동의합니다.'} defaultFlag={false} titleType={'loginForm'} onChangeHandler={checkBoxHandler} />
				</div>
				<Alert title={memberMessage('NEED_AGREE_WITHDRAWPOLICY').message} alertdisplay={alertDP} alertStyle={'text-align:center'} />
				<div style={{marginBottom: '5rem'}}></div>
				<div className={'buttonArea'}>
					<div style={{marginRight: '3rem'}} onClick={(e) => goToURL(e, '/', navigate)}>
						<ButtonGeneral title={'취소'} buttontype={'middle'} colortype={'cancel'} />
					</div>
					<div onClick={submitHandler}>
						<ButtonGeneral title={'회원탈퇴'} buttontype={'middle'} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default React.memo(WithdrawPolicy)
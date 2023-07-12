import {
	ciFileMaxLength,
	ciFileTypes, ciMaxFileSize,
	portfolioFileTypes,
	portfolioMaxFileSize,
	portfolioMaxLength, qnaFileMaxLength,
	qnaFileTypes, qnaMaxFileSize
} from './common'

interface Message {
	title: string,
	message: string
}

/**********************************************************************************************************************
 *
 *		권한과 관련된 메시지
 *
 **********************************************************************************************************************/
export const authMessage = (code: string): Message => {
	// console.log(errCode);
	switch(code) {
		case 'AUTH_DENIED':
			return {title: '주의', message: '권한이 없습니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}

/**********************************************************************************************************************
 *
 * 		공통 메시지 (등록/삭제/수정 확인 및 완료 메시지)
 *
 **********************************************************************************************************************/
export const commMessage = (code: string, name: string = '', min: string|number = ''): Message => {
	// console.log(errCode);
	switch(code) {
		// 기본적인 조건에 부합하지 않는 경우를 위함
		case 'CHAR_SIZE_CONSTRAINT':
			return {title: '알림', message: name + ' 최소 ' + min + '자 이상으로 입력해주세요.'}
		case 'ONLY_ENGLISH':
			return {title: '알림', message: '영어만 입력 가능합니다.'}
		case 'ONLY_KOREAN':
			return {title: '알림', message: '한글만 입력 가능합니다.'}
		case 'NEVER_KOREAN':
			return {title: '알림', message: '한글을 사용할 수 없습니다.'}
		case 'NEVER_ADD':
			return {title: '알림', message: '더이상 추가할 수 없습니다.'}
		case 'NEVER_SPECIAL_CHAR':
			return {title: '알림', message: '특수문자는 허용되지 않습니다.'}
		case 'ONLY_NUMBER':
			return {title: '알림', message: name + ' 숫자만 입력 가능합니다.'}
		case 'NEVER_NUMBER':
			return {title: '알림', message: name + ' 숫자를 입력할 수 없습니다.'}
		case 'INVALID_SPECIAL_CHARACTER':
			return {title: '알림', message: '특수문자는 입력할 수 없습니다.'}
		case 'INVALID_SPACE':
			return {title: '알림', message: name + ' 공백을 포함할 수 없습니다.'}
		case 'INVALID_INPUT_PARAM':
			return {title: '알림', message: '입력값을 확인해주세요.'}
		case 'ALL_CHECK_FALSE':
			return {title: '알림', message: '정확히 입력되지 않은 항목이 있습니다.\n다시 확인해주세요.'}
		case 'CONFIRM_DELETE':
			return {title: '확인', message: '삭제하시겠습니까?'}
		case 'CONFIRM_COPY':
			return {title: '확인', message: '복사하시겠습니까?'}
		case 'CONFIRM_MODIFY':
			return {title: '확인', message: '수정하시겠습니까?'}
		case 'REGISTER_COMPLETE':
			return {title: '알림', message: '등록되었습니다.'}
		case 'MODIFY_COMPLETE':
			return {title: '알림', message: '수정되었습니다.'}
		case 'DELETE_COMPLETE':
			return {title: '알림', message: '삭제되었습니다.'}
		case 'DELETE_FILE_COMPLETE':
			return {title: '알림', message: '파일을 삭제했습니다.'}
		case 'EMAIL_ADDRESS_INVALID':
			return {title: '알림', message: '이메일 형식이 올바르지 않습니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}

/**********************************************************************************************************************
 *
 * 		로그인, 회원가입, 회원탈퇴, 회원정보 수정 관련
 *
 **********************************************************************************************************************/
export const memberMessage = (code: string, name: string = ''): Message => {
	switch(code) {
		case 'NEED_AGREE_ALLPOLICY':
			return {title: '알림', message: '모두 동의하셔야 회원가입이 가능합니다.'}
		case 'NEED_AGREE_WITHDRAWPOLICY':
			return {title: '알림', message: '탈퇴약관에 동의하셔야 회원 탈퇴가 가능합니다.'}
		case 'INVALID_MEMBER':
			return {title: '알림', message: '아이디 또는 비밀번호를 확인해주세요.'}
		case 'INVALID_PASSWORD':
			return {title: '알림', message: name + ' 최소 8자 이상, 최대 20자 이하의 문자, 숫자, 특수문자로 구성해야 합니다.'}
		case 'NEED_MOBILENUMBER_CERTIFY':
			return {title: '알림', message: '휴대전화번호 인증번호를 확인해야 합니다.'}
		case 'NEED_CHECK_MOBILE_OR_CERTNUMBER':
			return {title: '알림', message: '휴대전화번호 또는 인증번호를 다시 확인해주세요.'}
		case 'NOT_CONFIRM_PASSWORD':
			return {title: '알림', message: '비밀번호가 서로 상의합니다. 다시 입력해주세요.'}
		case 'NEED_BIZ_NUMBER':
			return {title: '알림', message: '사업자등록번호 확인이 필요합니다.'}
		case 'FIND_ACCOUNT_FAILED':
			return {title: '알림', message: '입력하신 정보와 일치하는 계정을 찾을 수 없습니다.'}
		case 'TEMP_PASSWORD_FAILED':
			return {title: '알림', message: '임시 비밀번호가 일치하지 않습니다.'}
		case 'TEMP_PASSWORD_TIMEOVER':
			return {title: '알림', message: '임시 비밀번호 제한시간이 지났습니다. 다시 발급받아 주시기 바랍니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}

/**********************************************************************************************************************
 *
 * 		파일 관련 메시지
 *
 **********************************************************************************************************************/
export const fileMessage = (code: string): Message => {
	// console.log(errCode);
	switch(code) {
		case 'DELETE_FILE_COMPLETE':
			return {title: '알림', message: '파일을 삭제했습니다.'}
		case 'DELETE_FILE_FAILED':
			return {title: '알림', message: '파일 삭제에 실패했습니다.'}
		case 'MEMBER_EXIST':
			return {title: '주의', message: '이미 등록되어 있습니다.'}
		case 'FILE_MAXSIZE':
			return {title: '주의', message: '첨부하신 파일의 용량이 허용치를 초과했습니다.'}
		case 'FILE_MAXCNT':
			return {title: '주의', message: '첨부가능한 파일 개수를 초과했습니다.'}
		case 'FILE_TYPE':
			return {title: '주의', message: '등록할 수 없는 파일종류 입니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}


/**********************************************************************************************************************
 *
 * 		error Page에서 사용하는 메시지
 *
 **********************************************************************************************************************/
export const errorMessage = (code: string): Message => {
	switch(code) {
		case 'NEVER_CONNECT_TECHNIQUE':
			return {title: '서비스에 접속할 수 없습니다.', message: '기술적인 문제로 일시적으로 접속이되지 않습니다.\n잠시 후 다시 시도해주세요.'}
		case 'NOT_NORMAL_CONNECT':
			return {title: '정상적인 접근이 아닙니다.', message: '알수없는 이유로 비정상적 접근이 확인됐습니다.\n계속해서 접근이 안되는 경우 관리자에게 문의해주세요.'}
		case 'ERROR404':
			return {title: '존재하지 않는 페이지 입니다.', message: '존재하지 않는 페이지에 접근하셨습니다.\n계속해서 접근이 안되는 경우 관리자에게 문의해주세요.'}
		default:
			return {title: '알수없는 에러가 발생했습니다.', message: '아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}

/**********************************************************************************************************************
 *
 * 		안내 메시지
 *
 **********************************************************************************************************************/
export const infoMessage = (code: string): Message => {
	switch(code) {
		case 'CO_REGISTER_INFO':
			return {title: '알림', message: '회원가입 후 이메일을 인증하셔야 로그인이 가능합니다.'}
		case 'PE_FINDID_INFO':
			return {title: '알림', message: '회원가입 시 등록하신 이메일 주소와 휴대전화번호를 입력하시면 이메일로 아이디를 보내드립니다.'}
		case 'CO_FINDID_INFO':
			return {title: '알림', message: '회원가입 시 등록하신 사업자등록번호와 휴대전화번호를 입력하시면 이메일로 아이디를 보내드립니다.'}
		case 'PE_FINDPWD_INFO':
			return {title: '알림', message: '회원가입 시 등록하신 이메일로 임시 비밀번호를 발급해 드립니다.\n 임시 비밀번호는 1시간 동안만 사용 가능합니다.'}
		case 'CO_FINDPWD_INFO':
			return {title: '알림', message: '회원가입 시 등록하신 이메일로 임시 비밀번호를 발급해 드립니다.\n 임시 비밀번호는 1시간 동안만 사용 가능합니다.'}
		case 'CHANGE_TEMP_PASSWORD':
			return {title: '알림', message: '새로운 비밀번호는 대/소문자를 구별하며 영어, 숫자, 특수문자를 포함한 8자 이상 20자 이하로 입력해주세요.'}
		case 'NEWSLETTER_INFO':
			return {title: '알림', message: '뉴스레터 신청 취소는 발송되는 뉴스레터 링크 또는 팝업 상단의 뉴스레터 취소 메뉴에서 가능합니다.'}
		case 'QNA_FILE_INFO':
			return {title: '알림', message: '파일은 총 '+qnaFileMaxLength+'개, 각 '+qnaMaxFileSize+'MB씩 등록 가능합니다. 등록가능 파일 종류: ' + qnaFileTypes}
		case 'MYINFO_PASSWORD':
			return {title: '알림', message: '비밀번호는 입력시에만 변경됩니다.'}
		case 'MYINFO_ADDINFO':
			return {title: '알림', message: '추가정보는 입사지원과 프로젝트 지원 시 회사에 공개되며, 검색 시 유리합니다.'}
		case 'COINFO_ADDINFO':
			return {title: '알림', message: '추가정보는 회사 소개에 노출됩니다.'}
		case 'CODETAIL_CI_INFO':
			return {title: '알림', message: '파일은 '+ciFileMaxLength+'개, '+ciMaxFileSize+'MB까지 등록 가능합니다. 등록가능 파일 종류: ' + ciFileTypes}
		case 'CODETAIL_CI':
			return {title: '알림', message: '회사 CI를 등록해주세요.'}
		case 'RESUME_CONTACT':
			return {title: '알림', message: '기업 채용 담당자의 요청을 받고싶은 경우 선택하세요.'}
		case 'RESUME_TAG':
			return {title: '알림', message: '해시태그는 클라이언트가 인재 검색 시 활용하는 정보입니다. 자신의 장점을 잘 살릴 수 있는 단어를 3개 이상 입력해주세요.'}
		case 'PORTFOLIO_ADDINFO':
			return {title: '알림', message: '파일은 ' + portfolioMaxLength + '개, 각 '+ portfolioMaxFileSize +'MB까지 등록 가능합니다. 등록가능 파일 종류: ' + portfolioFileTypes}
		case 'RESUME_SCHOOL_INFO':
			return {title: '알림', message: '최종 학력만 입력해주세요.'}
		case 'RESUME_CAREER':
			return {title: '알림', message: '경력은 최대 3개까지만 입력 가능합니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}


/**********************************************************************************************************************
 *
 * 		placeholder
 *
 **********************************************************************************************************************/
export const placeholderMessage = (code: string): string => {
	switch(code) {
		case 'LOGIN_ID':
			return '휴대전화번호 또는 이메일 주소를 입력해주세요.'
		case 'LOGIN_PASSWORD':
			return '비밀번호를 입력해주세요.'
		case 'PASSWORD_CONFIRM':
			return '비밀번호를 한번 더 입력해주세요.'
		case 'QNA_REGISTER':
			return '문의하실 내용을 입력해주세요'
		case 'EMAIL_INPUT':
			return '이메일 주소를 입력해주세요.'
		case 'NAME_INPUT':
			return '이름을 입력해주세요.'
		case 'CERT_INPUT':
			return '인증번호를 입력해주세요.'
		case 'BUSINESS_NUMBER_INPUT':
			return '사업자등록번호를 입력해주세요.'
		case 'BASIC_ADDRESS_INPUT':
			return '검색을 통해 주소를 입력해주세요.'
		case 'DETAIL_ADDRESS_INPUT':
			return '상세 주소를 입력해주세요.'
		case 'RESUME_TITLE':
			return '이력서 제목은 채용 및 일거리 담당자에게 노출되는 정보입니다. 자신의 장점, 차별점을 어필해보세요.'
		case 'SCHOOLNAME_INPUT':
			return '학교명을 입력해주세요.'
		case 'RESUME_TAG':
			return '태그를 입력해주세요.'
		case 'MAJOR_INPUT':
			return '전공명을 입력해주세요.'
		case 'COMPANY_NAME_INPUT':
			return '회사명을 입력해주세요.'
		case 'DIVISION_NAME_INPUT':
			return '부서명을 입력해주세요.'
		case 'POSITION_NAME_INPUT':
			return '직급 또는 직책'
		case 'RESPONSIBILITY_INPUT':
			return '역할과 직무를 간략하게 입력해주세요.'
		case 'RESUME_PROFILE':
			return '자기 소개를 1,000자 이내로 작성해주세요.'
		case 'CAREER_INTRODUCE':
			return '경력에 대해 200자 이내로 간략히 기술해주세요.'
		default:
			return '내용을 입력해주세요.'
	}
}
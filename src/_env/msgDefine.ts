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
		case 'DEFAULT_CONSTRAINT':
			return {title: '경고', message: name + '은 최소 ' + min + '자 이상으로 입력해주세요.'}
		case 'INVALID_INPUT_PARAM':
			return {title: '알림', message: '입력값을 확인해주세요.'}
		case 'CONFIRM_DELETE':
			return {title: '확인', message: '삭제하시겠습니까?'}
		case 'CONFIRM_MODIFY':
			return {title: '확인', message: '수정하시겠습니까?'}
		case 'REGIST_COMPLETE':
			return {title: '알림', message: '등록되었습니다.'}
		case 'MODIFY_COMPLETE':
			return {title: '알림', message: '수정되었습니다.'}
		case 'DELETE_COMPLETE':
			return {title: '알림', message: '삭제되었습니다.'}
		case 'DELETE_FILE_COMPLETE':
			return {title: '알림', message: '파일을 삭제했습니다.'}
		case 'DELETE_FILE_FAILED':
			return {title: '알림', message: '파일 삭제에 실패했습니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}

/**********************************************************************************************************************
 *
 * 		로그인, 회원가입, 회원탈퇴, 회원정보 수정 관련
 *
 **********************************************************************************************************************/
export const memberMessage = (code: string): Message => {
	switch(code) {
		case 'INVALID_MEMBER':
			return {title: '알림', message: '아이디 또는 비밀번호를 확인해주세요.'}
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
			return {title: '주의', message: '파일 사이즈는 3MB까지만 등록 가능합니다.'}
		case 'FILE_MSXCNT':
			return {title: '주의', message: '파일은 3개까지 등록 가능합니다.'}
		case 'FILE_TYPE':
			return {title: '주의', message: '등록할 수 없는 파일종류 입니다.'}
		default:
			return {title: '주의', message: '알수없는 에러가 발생했습니다.\n아래의 코드와 함께 관리자에게 문의해주세요.\nERR_CODE:' + code}
	}
}
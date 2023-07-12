import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

/****************************************************************************************
 *
 *		Navigation과 관련한 모든 것을 처리한다.
 *
 ***************************************************************************************/
function useNavigation() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()
	const location = useLocation()
	const propState = {...location.state}

	/****************************************************** contents initialization or definition ***************************************************/



	/****************************************************** Handling ***************************************************/
	// 특정 주소로 보내기
	const goToURL = (e: React.SyntheticEvent, URL: string, state: string|object|null = '', replaceOption: boolean|null = false) => {
		e.preventDefault()

		// replaceOption = (replaceOption) ? true : false
		//이것과 같다는데.... !!(replaceOption)
		// navigate(URL, {replace: replaceOption, state: state})
		navigate(URL, {replace: replaceOption!, state: state})
	}


	return {
		navigate,
		goToURL,
		propState,
	}
}

export default useNavigation
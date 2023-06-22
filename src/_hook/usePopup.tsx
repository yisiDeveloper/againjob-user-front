import React, {ReactElement, useState} from 'react'


interface usePopupPropType {
	el: ReactElement,
	title: string|null,
	content: string,
	cancelFunc?: object|Function|null,
	okFunc?: object|Function|null

}

function usePopup({
	el,
	title,
	content,
	cancelFunc,
	okFunc
}: usePopupPropType) {

	/****************************************************** common basic definition ***************************************************/
	// 팝업 display를 세팅
	const [popDP, setPopDP] = useState<boolean>(false)
	// 팝업 element를 세팅
	const [popupElement, setPopupElement] = useState<React.ReactElement>()

	/****************************************************** contents initialization or definition ***************************************************/


	/****************************************************** Handling ***************************************************/
	const popOpen = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setPopDP(true)
	}

	const popClose = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setPopDP(false)
	}


	return {
		popDP,
		popupElement,
		popOpen,
		popClose
	}
}

export default usePopup
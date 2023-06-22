import React, {useEffect, useRef} from 'react'
import './tabmenu.css'


interface TabMenuPropType {
	title: string,
	focuson: boolean
}

function TabMenu({
	title,
	focuson
 }: TabMenuPropType) {

	/****************************************************** common basic definition ***************************************************/


	/****************************************************** contents initialization or definition ***************************************************/
	const tabRef = useRef<any>()

	/****************************************************** Handling ***************************************************/
	useEffect(() => {
		if(tabRef) {
			if(focuson) {
				tabRef.current.className = 'tabBasic tabOnFocus'
			} else {
				tabRef.current.className = 'tabBasic tabNoFocus'
			}
		}
	},[focuson])

	return (
		<div ref={tabRef}>{title}</div>
	)
}

export default React.memo(TabMenu)
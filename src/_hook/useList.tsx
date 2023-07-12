import React, {useCallback, useEffect, useState} from 'react'
import {involveList} from '../_env/SampleData'

/****************************************************************************************
 *
 *		Navigation과 관련한 모든 것을 처리한다.
 *
 ***************************************************************************************/
interface listType {
	popupdpsetter: React.SetStateAction<any>,
	popupmsgsetter: React.SetStateAction<any>,
	apiURL: any,
	setliststate: React.SetStateAction<any>
}
function useList({
	popupdpsetter,
	popupmsgsetter,
	apiURL,
	setliststate
}: listType) {

	// 전체 게시물 수
	const [totalListCount, setTotalListCount] = useState<number>(1)
	// 현재 페이지
	// 목록
	const [listContent, setListContent] = useState<any[]>([])

	/****************************************************** Handling ***************************************************/

	// 목록을 가져오자
	// 아래 apiURL을 현재 any로 해놓은 것은 테스트를 위해 샘플 데이터를 가져오기 위함이다.
	// 나중에는 string으로 바꿔서 실제 주소를 가져와서 불러와야 함
	const getListContent = useCallback((requestPage: number, liststate: any) => {

		// console.log('liststate', liststate)

		if(requestPage===undefined) {
			requestPage = 1
		}
		let tmpQueryData = {
			searchOption: liststate.searchOption,
			searchKeyword: liststate.searchKeyword,
			currentPage: requestPage
		}
		// console.log('보낼 데이터는', tmpQueryData)
		// 전체 게시물 수 세팅
		setliststate(tmpQueryData)
		setListContent(apiURL)
		setTotalListCount(161 )
		// console.log('new liststate', tmpQueryData)

		// popupdpsetter(true)
		// popupmsgsetter('ALL_CHECK_FALSE')
	},[])

	return {
		getListContent,
		listContent,
		totalListCount
	}
}

export default useList
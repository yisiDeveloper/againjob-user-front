import React, {useCallback, useEffect} from 'react'
import {checkRequiredKeyValue} from '@handler'
import {pageURL_ERROR_NotiForCS} from '@env'
import {useForm, useNavigation} from '@hook'


interface PeEstimateListPropType {
}

function PeEstimateList({}: PeEstimateListPropType) {

	
	return (
		<main>
			<section className={'container containerTop'}>
				평가관리
				<div className={'emptyDivHeight'}/>
			</section>
		</main>
	)
}

export default React.memo(PeEstimateList)
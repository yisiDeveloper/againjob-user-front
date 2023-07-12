import React, {useCallback} from 'react'
import {AlertForSearch, DropdownForSearch, InputForSearch} from '@components'
import styled from 'styled-components'
import {SearchIcon} from '@assets'
import './search.css'
import {commMessage} from '@env'

type ValuesType = {
	searchOption: string,
	searchKeyword: string
}
interface ListSearchPropType {
	options: object[],			// Dropdown의 option
	values: any,
	errors: any,
	inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
	changeHandler: Function,
	submitHandler: Function,
	errorMessage: string,
	setErrorMessage: Function
}

function ListSearch({
	options,
	values,
	errors,
	inputHandler,
	changeHandler,
	submitHandler,
	errorMessage,
	setErrorMessage
}: ListSearchPropType) {

	// console.log('List Search의 values', values)
	/****************************************************** common basic definition ***************************************************/


	/****************************************************** contents initialization or definition ***************************************************/


	/****************************************************** Handling ***************************************************/
	const goSearch = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()
		// console.log(values)
		// console.log(errors)
		if(values.searchKeyword === '' || errors.searchKeyword) {
			setErrorMessage(e,'searchKeyword',commMessage('INVALID_INPUT_PARAM').message)
		} else {
			alert('해당 조건으로 검색합니다.')
			submitHandler()
		}
	},[errors, values])

	return (
		<div className={'searchWrap'}>
			<DropdownForSearch
				Options={options}
				name={'searchOption'}
				changeFunc={changeHandler}
				defaultValue={values.searchOption}
				values={values}
			/>
			<div>
				<InputForSearch
					name={'searchKeyword'}
					onchange={inputHandler}
					value={values.searchKeyword}
					// onkeydown={enterHandler}
				/>
				<AlertForSearch title={errorMessage} alertdisplay={true} />
			</div>
			<ListSearchArea onClick={goSearch} />
		</div>
	)
}

const ListSearchArea = styled.div`
	//border: 1px solid yellowgreen;
	width: 6rem;
	height: 6rem;
	background: url(${SearchIcon}) no-repeat center center;
	cursor: pointer;
`

export default React.memo(ListSearch)
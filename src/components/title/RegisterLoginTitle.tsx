import React from 'react'
import './title.css'


interface TitleType {
	title: string
}

function RegisterLoginTitle({
	title
}:TitleType) {

	return (
		<div className={'titleStyle'}>
			{title}
		</div>
	)
}

export default React.memo(RegisterLoginTitle)
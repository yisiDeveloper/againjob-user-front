import React from 'react'
import './title.css'


interface TitleType {
	title: string
}

function RegistLoginTitle({
	title
}:TitleType) {

	return (
		<div className={'titleStyle'}>
			{title}
		</div>
	)
}

export default React.memo(RegistLoginTitle)
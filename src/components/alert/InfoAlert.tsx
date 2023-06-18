import React, {useState} from 'react'
import {infoMessage} from '@env'

interface infoType {
	messageCode: string
}
function InfoAlert({
	 messageCode
 }: infoType) {

	const [message, ] = useState(infoMessage(messageCode).message)

	return (
		<div className={'infoMessageArea'}>
			{message}
		</div>
	)
}

export default React.memo(InfoAlert)
import React, {useState} from 'react'
import './error.css'
import {errorMessage, pageURL_Sign_Login} from '@env'
import {ButtonGeneral} from '@components'
import {useNavigation} from '@hook'

function NotiForCS() {

	/****************************************************** common basic definition ***************************************************/
	const { goToURL, propState } = useNavigation()

	// console.log('CS Page Props',propState)
	/****************************************************** contents initialization or definition ***************************************************/
	const [errContent, ] = useState(errorMessage(propState.errorCode))


	return (
		<main>
			<section className={'errorContainer'}>
				<article className={'errorTitle'}>
					{errContent.title}
				</article>
				<article className={'errorContent'}>
					{errContent.message}
				</article>
				<div className={'errorBtnArea'}>
					<div className={'errorBtn'}
						 onClick={(e) => goToURL(e, '/')}
					>
						<ButtonGeneral
							title={'홈으로 가기'}
							buttontype={'middle'}
							colortype={''}
						/>
					</div>
					<div className={'errorBtn'}
						 onClick={(e) => goToURL(e, pageURL_Sign_Login)}
					>
						<ButtonGeneral
							title={'로그인'}
							buttontype={'middle'}
							colortype={''}
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default React.memo(NotiForCS)
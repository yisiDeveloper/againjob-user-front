import React, {useState} from 'react'
import './error.css'
import {errorMessage, pageURL_Sign_Login} from '@env'
import {useNavigate} from 'react-router-dom'
import {ButtonGeneral} from '@components'
import {goToURL} from '@handler'

function Error404() {

    /****************************************************** common basic definition ***************************************************/
    const navigate = useNavigate()

    /****************************************************** contents initialization or definition ***************************************************/
    const [errContent, ] = useState(errorMessage('ERROR404'))

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
                         onClick={(e) => goToURL(e, '/', navigate)}
                    >
                        <ButtonGeneral
                            title={'홈으로 가기'}
                            buttontype={'middle'}
                            colortype={''}
                        />
                    </div>
                    <div className={'errorBtn'}
                         onClick={(e) => goToURL(e, pageURL_Sign_Login, navigate)}
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


export default React.memo(Error404)
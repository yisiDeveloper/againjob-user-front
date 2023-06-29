import React from 'react'
import styled from 'styled-components'
import './input.css'
import {Alert} from '@components'

interface inputType {
    title?: string|null,
    titleDP: boolean,
    placeholder: string,
    name: string,
    max: number,
    type: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string | null,
    disabled?: boolean | undefined,
    message?: string | null
}
function InputWithAlert({
    title,
    titleDP = true,
    placeholder,
    name,
    max,
    type,
    onchange,
    value = null,
    disabled = false,
    message
}:inputType) {

    return (
        <div className={'inputArea'}>
            <TitleArea titledp={titleDP.toString()}><div className={'inputTitle'}>{title}</div></TitleArea>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                maxLength={max}
                onChange={onchange}
                disabled={disabled}
                defaultValue={value!}
                // onKeyDown={onkeydown}
            />
            {message && <Alert title={message} alertdisplay={true} />}
        </div>
    )
}

type TitleType = {
    titledp: string
}

const TitleArea = styled.div<TitleType>`
	visibility: ${props => props.titledp === 'true' ? 'visible' : 'hidden'};
	height: 2rem;
`

export default React.memo(InputWithAlert)
import React from 'react'
import './title.css'
import styled from 'styled-components'

interface TitlePropType {
    title: string,
    type?: string|null
}
function PageTitle({
    title,
    type
}: TitlePropType) {

    return (
        <TitleDiv type={type}>
            {title}
        </TitleDiv>
    )
}

type titleType = {
    type?: string|null
}

const TitleDiv = styled.div<titleType>`
    color: ${(props) => props.type==='notFocus' ? 'var(--fontTabMenuNoFocus);' : 'var(--fontTabMenuOnFocus);'};
    font-size: var(--fontSizePageTitle);
    font-weight: var(--fontWeightBold);
    //margin-left: var(--marginLeftPageTitle)
    //border: 1px solid red;
    //display: inline-block;
    margin-left: 2rem;
    margin-bottom: 3rem;
`
export default React.memo(PageTitle)
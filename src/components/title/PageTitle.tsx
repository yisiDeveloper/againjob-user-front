import React from 'react'
import './title.css'

interface TitlePropType {
    title: string
}
function PageTitle({
    title
}: TitlePropType) {

    return (
        <div className={'pageTitle'}>
            {title}
        </div>
    )
}

export default React.memo (PageTitle)
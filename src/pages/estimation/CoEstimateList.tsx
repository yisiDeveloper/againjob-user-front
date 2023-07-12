import React from 'react'
import {PageTitle, TabMenu} from '@components'



function CoEstimateList() {



	return (
		<>
			<section className={'contentPopupWrap'} style={{width: '50rem'}}>
				<div className={'contentPopupHead'}>
					<div className={'contentPopupTitle'}><PageTitle title={'주식회사 이시'} /></div>

				</div>
				<article className={'contentPopupContent'}>
					<div className={'tabMenuArea'}>
						<div className={'tabMenu'}><TabMenu title={'일거리평가'} focuson={true} /></div>
						<div className={'tabMenu'}><TabMenu title={'채용평가'} focuson={false} /></div>
					</div>
					<div className={'emptyDivHeight'} />

				</article>
			</section>
		</>
	)
}

export default React.memo(CoEstimateList)
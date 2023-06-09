import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'
import Gnb from './Gnb'
import Footer from './Footer'
import {blockEnterKey} from '@handler'

interface LayoutDefaultProps {
	children?: React.ReactElement
}

blockEnterKey();

function Layout({children}: LayoutDefaultProps) {

	return (
		<AgainJobWrapper>
			<Gnb />
			<PageArea>
				{children || <Outlet />}
			</PageArea>
			<Footer />
		</AgainJobWrapper>
	)
}

const AgainJobWrapper = styled.div`
	display: flex;
	flex-direction: column;
	//width: 100%;
	// width: 100vw;
	//height: 100vh;
	white-space: pre-line;// React에서 줄바꿈이 되도록 하기 위함
	// 이걸 html body 등에 주면 이상하게 상단에 공백이 생긴다.
`

const PageArea = styled.div`
	width: 100%;
	margin-top: 3rem;
	margin-bottom: 3rem;
	display: flex;
	justify-content: center;
	background-color: var(--bgPageBasicColor);
`
export default React.memo(Layout)
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'
import Gnb from './Gnb'
import Footer from './Footer'
import {blockEnterKey} from '@handler'

interface LayoutDefaultProps {
	children?: React.ReactElement;
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
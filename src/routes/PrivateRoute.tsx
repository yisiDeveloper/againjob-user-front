import React, {ReactElement} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {authFlagName} from '@env'
import {getSessionItem} from '@handler'


interface PrivateRouteProps {
  children ?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication : boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}


export default function PrivateRoute({authentication}:PrivateRouteProps):React.ReactElement|null {
	/**
	 * 로그인 했는지 여부
	 * 로그인 했을 경우 : true 라는 텍스트 반환
	 * 로그인 안했을 경우 : null or false(로그아웃 버튼 눌렀을경우 false로 설정) 반환
	 */
	const isAuthenticated = getSessionItem(authFlagName)
	console.log('isAuthenticated', isAuthenticated);
	// console.log('authentication', authentication);

	if(authentication) {
		// 인증을 받아야 들어갈 수 있는 페이지인데 그렇지 않을 경우
		// console.log('go to login')
		return (isAuthenticated === null || isAuthenticated === false) ? <Navigate to='/Sign/Login' /> : <Outlet/>;
		// return <Outlet />
	} else {
		// 인증을 받지 않아야 들어갈 수 있는 페이지인 경우
		// console.log('go to main')
		return (isAuthenticated === null || isAuthenticated === true) ? <Navigate to='/' /> : <Outlet/>;
		// return <Outlet />
	}
}
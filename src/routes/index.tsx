import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	Login,
	Main,
	Member,
	Classify,
	ChoiceChannel,
	PePolicy
} from '@pages'
import { Layout } from '@components'
import PrivateRoute from './PrivateRoute'
import { GlobalStyle } from '../global-style'
import {
	pageURL_Sign_Login,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_ChoiceChannel,
	pageURL_Sign_PE_AgreePolicy
} from '@env'


// Error 페이지 정의
// import Error404 from "pages/common/error/Error404";

// Layout 페이지 정의

export default function Router() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Layout />}>

					<Route index element={<Main />} />
					{/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
					{/* <Route index element={<DefaultLayout><MainPage/></DefaultLayout>}/> */}
					{/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
					<Route element={<PrivateRoute authentication={false} />}>
						<Route path={pageURL_Sign_Login} element={<Login />} />
						<Route path={pageURL_Sign_ChoiceClassify} element={<Classify />} />
						<Route path={pageURL_Sign_ChoiceChannel} element={<ChoiceChannel />} />
						<Route path={pageURL_Sign_PE_AgreePolicy} element={<PePolicy />} />
					</Route>

					{/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
					<Route element={<PrivateRoute authentication={true} />}>
						<Route path="/member" element={<Member />} />
						{/*<Route path="/member/:id" element={<MemberDetail />} />*/}
					</Route>

					{/* 권한 체크가 필요한 페이지 정의 */}
					{/* ProtectRoute는 반드시 로그인한 사용자의 한해서만 되도록 구현되어 PrivateRoute안에 종속되어야한다. */}
					{/* <Route element={<ProtectRoute />}>
						<Route element={<AdminDefaultLayout />}>
						<Route path="/admin" element={<AdminMainPage />} />
						<Route path="/admin/member" element={<MemberManageMainPage />} />
						</Route>
					</Route> */}

					{/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
					{/* <Route path="/*" element={<Error404 />} /> */}

				</Route>

			</Routes>
		</BrowserRouter>
	);
}

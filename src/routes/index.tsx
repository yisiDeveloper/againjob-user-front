import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {
	Main,
	Login, PeFindId, CoFindId, PeFindPwd, CoFindPwd,
	Classify, ChoiceChannel, PePolicy, CoPolicy, PeInfo, CoInfo, SignUpEnd,
	NotiForCS, Error404,
	ChangeTempPwd, ServicePolicy, PrivacyPolicy,
	WithdrawPolicy, WithdrawComplete,
	NoticeList, NoticeDetail, Faq, QnaList, QnaDetail, FaqDetail, QnaRegister
} from '@pages'
import { Layout } from '@components'
import PrivateRoute from './PrivateRoute'
import { GlobalStyle } from '../global-style'
import {
	pageURL_Sign_Login,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_ChoiceChannel,
	pageURL_Sign_PE_AgreePolicy,
	pageURL_Sign_CO_AgreePolicy,
	pageURL_Sign_PE_Info,
	pageURL_Sign_Complete,
	pageURL_Sign_CO_Info,
	pageURL_ERROR_NotiForCS,
	pageURL_Sign_CO_FindID,
	pageURL_Sign_PE_FindPwd,
	pageURL_Sign_PE_FindID,
	pageURL_Sign_CO_FindPwd,
	pageURL_Sign_ChangeTempPwd,
	pageURL_Member_WithdrawComplete,
	pageURL_Member_WithdrawPolicy,
	pageURL_Policy_Service,
	pageURL_Policy_Privacy,
	pageURL_CS_NoticeList, pageURL_CS_NoticeDetail,
	pageURL_CS_Faq, pageURL_CS_FaqDetail,
	pageURL_CS_QnaRegister,	pageURL_CS_QnaList,	pageURL_CS_QnaDetail
} from '@env'

// Error 페이지 정의


// Layout 페이지 정의

// 팝업을 정 중앙에 고정하기 위함
let userInnerHeight = window.innerHeight;
let userMargin = (userInnerHeight-250)/2

// console.log('Browser Width',window.innerWidth)
// console.log('Browser Height',window.innerHeight)
// console.log('page width',document.documentElement.scrollWidth)
// console.log('page Height',document.documentElement.scrollHeight)


export default function Router() {
	return (
		<BrowserRouter>
			<GlobalStyle userMargin={userMargin}/>
			<Routes>
				<Route path="/" element={<Layout/>}>

					<Route index element={<Main/>}/>
					{/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
					<Route path={pageURL_Policy_Service} element={<ServicePolicy/>}/>
					<Route path={pageURL_Policy_Privacy} element={<PrivacyPolicy/>}/>
					<Route path={pageURL_CS_NoticeList} element={<NoticeList />}/>
					<Route path={pageURL_CS_NoticeDetail} element={<NoticeDetail />}/>
					<Route path={pageURL_CS_Faq} element={<Faq />}/>
					<Route path={pageURL_CS_FaqDetail} element={<FaqDetail />}/>

					{/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
					<Route element={<PrivateRoute authentication={false}/>}>
						<Route path={pageURL_Sign_Login} element={<Login/>}/>
						<Route path={pageURL_Sign_ChoiceClassify} element={<Classify/>}/>
						<Route path={pageURL_Sign_ChoiceChannel} element={<ChoiceChannel/>}/>
						<Route path={pageURL_Sign_PE_AgreePolicy} element={<PePolicy/>}/>
						<Route path={pageURL_Sign_CO_AgreePolicy} element={<CoPolicy/>}/>
						<Route path={pageURL_Sign_PE_Info} element={<PeInfo/>}/>
						<Route path={pageURL_Sign_CO_Info} element={<CoInfo/>}/>
						<Route path={pageURL_Sign_Complete} element={<SignUpEnd />}/>
						<Route path={pageURL_Sign_PE_FindID} element={<PeFindId />}/>
						<Route path={pageURL_Sign_CO_FindID} element={<CoFindId />}/>
						<Route path={pageURL_Sign_PE_FindPwd} element={<PeFindPwd />}/>
						<Route path={pageURL_Sign_CO_FindPwd} element={<CoFindPwd />}/>
						<Route path={pageURL_Sign_ChangeTempPwd} element={<ChangeTempPwd />}/>
						<Route path={pageURL_Member_WithdrawComplete} element={<WithdrawComplete />}/>
					</Route>

					{/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
					<Route element={<PrivateRoute authentication={true}/>}>
						<Route path={pageURL_Member_WithdrawPolicy} element={<WithdrawPolicy/>}/>
						{/*<Route path="/member/:id" element={<MemberDetail />} />*/}
						<Route path={pageURL_CS_QnaList} element={<QnaList/>}/>
						<Route path={pageURL_CS_QnaDetail} element={<QnaDetail/>}/>
						<Route path={pageURL_CS_QnaRegister} element={<QnaRegister/>}/>
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
					<Route path="/*" element={<Error404 />} />
					<Route path={pageURL_ERROR_NotiForCS} element={<NotiForCS/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

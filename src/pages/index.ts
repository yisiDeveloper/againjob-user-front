// import Login from './member/Login'
// import MemberList from './member/MemberList'
// import DocumentList from './document/DocumentList'

// export {
// 	Login,
// 	MemberList,
// 	DocumentList
// }

/***************************************************** main ****************************************************/
export { default as Main } from './main/Main'

/***************************************************** sign ****************************************************/
export { default as Login } from './sign/Login'
export { default as Classify} from './sign/Classify'
export { default as ChoiceChannel } from './sign/ChoiceChannel'
export { default as PePolicy } from './sign/PePolicy'
export { default as CoPolicy } from './sign/CoPolicy'
export { default as PeInfo } from './sign/PeInfo'
export { default as CoInfo } from './sign/CoInfo'
export { default as SignUpEnd } from './sign/SignUpEnd'
export { default as PeFindId } from './sign/PeFindID'
export { default as CoFindId } from './sign/CoFindID'
export { default as PeFindPwd } from './sign/PeFindPwd'
export { default as CoFindPwd } from './sign/CoFindPwd'
export { default as ChangeTempPwd } from './sign/ChangeTempPwd'


/***************************************************** member ****************************************************/
export { default as WithdrawPolicy} from './member/WithdrawPolicy'
export { default as WithdrawComplete} from './member/WithdrawComplete'
export { default as PeDetailInfo} from './member/PeDetailInfo'


/***************************************************** apply ****************************************************/


/***************************************************** cs ****************************************************/
export { default as NoticeList } from './cs/NoticeList'
export { default as NoticeDetail } from './cs/NoticeDetail'
export { default as QnaList } from './cs/QnaList'
export { default as QnaRegister } from './cs/QnaRegister'
export { default as QnaDetail } from './cs/QnaDetail'
export { default as Faq } from './cs/Faq'
export { default as FaqDetail } from './cs/FaqDetail'


/***************************************************** estimation ****************************************************/
export { default as CoEstimateList } from './estimation/CoEstimateList'

/***************************************************** involve ****************************************************/


/***************************************************** newsletter ****************************************************/
export { default as DenyCollectEmailAddress } from './newsletter/DenyCollectEmailAddress'
export { default as Newsletter } from './newsletter/Newsletter'
export { default as NewsletterComplete } from './newsletter/NewsletterComplete'

/***************************************************** payment ****************************************************/


/***************************************************** policy ****************************************************/
export { default as PrivacyPolicy } from './policy/PrivacyPolicy'
export { default as ServicePolicy } from './policy/ServicePolicy'


/***************************************************** recruit ****************************************************/


/***************************************************** request ****************************************************/


/***************************************************** resume ****************************************************/


/***************************************************** search ****************************************************/


/***************************************************** talent ****************************************************/


/***************************************************** utilization ****************************************************/


/***************************************************** work ****************************************************/


/***************************************************** error ****************************************************/
export { default as NotiForCS } from './error/NotiForCS'
export { default as Error404 } from './error/Error404'
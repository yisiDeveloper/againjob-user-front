import { createGlobalStyle } from "styled-components";
import {popup_CLoseButton} from '@assets'


type globalType = {
	userMargin: number
}


export const GlobalStyle = createGlobalStyle<globalType>`
:root {
	// rem 단위를 사용하기 위함 
	font-size: 62.5%;
	/***************************************************************************************************************
	
		Element based global variable
	
	***************************************************************************************************************/

	/****************** common ***********************/
	--comMainColor: #207945;
	--comContainerSize: 113rem;
	--opacityPopupBg: 75%;

	
	/******************* Font Color **********************/
	--fontBasicColor: #414550;
	--fontWhiteColor: #fff;

  	--fontUserWriteColor: #282C36;
	--fontInputAlertColor: #ED3E15;
	--fontPlaceHolderColor: #BAC9D1;
	--fontInputTitleColor: #414550;
	--fontInfoColor: #45AD70;
	
	--fontListSubInfoTitle: #798F9A;

	--fontPaginationBasicColor: #BAC9D1;
	--fontPaginationFocusColor: #414550;
	
	--fontTabMenuNoFocus: #BAC9D1;
	--fontTabMenuOnFocus: #414550;

	/******************* Font Size **********************/
	--fontSizeBasic: 1.6rem;
	
	--fontSizeGnb: 1.6rem;
	--fontSizeSub: 1.4rem;
	
	--fontSizeRegistLoginPageTitle: 4.8rem;
	
	--fontSizePageTitle: 3rem;
	--fontSizeListMain: 2rem;
	--fontSizeListSub: 1.6rem;
	--fontSizeListInfoTitle: 1.6rem;
	--fontSizeListInfoText: 1.8rem;
	--fontSizeListIcon: 1.4rem;
	
	--fontSizeInputTitle: 1.3rem;
	--fontSizeInputText: 1.6rem;
	--fontSizePlaceholder: 1.6rem;
	--fontSizeInputAlert: 1.4rem;

	--fontSizePopupTitle: 3rem;
	--fontSizePopupListMain: 1.4rem;
	--fontSizePopupListSub: 1.2rem;
	--fontSizePopupButton: 1.3rem;
	--fontSizePopupContent: 1.6rem;
	
	--fontSizeFooterText: 1.2rem;
	--fontSizeMainTitle: 2rem;
	
	--fontSizeBasicButton: 1.4rem;
	--fontSizeActionButton: 1.6rem;
	
	--fontSizeInfo: 1.4rem;
	
	--fontSizePageSearch: 2rem;

	
	/******************* Weight **********************/
	--fontWeightBasic: 400;
	--fontWeightBold: 700;
	--fontWeightMiddle: 500;

	--inputLineWeight: 0.05rem;
	
	
	/******************* Background **********************/
	--bgPageBasicColor: #F6F2EE;
	--bgContentBasicBgColor: #FFF;
	
	--bgAdareaColor: #414550;
	
	--bgBtnBasic: #333742;
	--bgBtnDisabled: #BAC9D1;
	--bgBtnNotImportant: #BAC9D1;
	--bgBtnSky : #00A9E8;
	--bgBtnYellowGreen: #9ACA40;
	--bgBtnCancel: #EEF2F4;
	
	--bgIconBasic: #798F9A;
	--bgIconBtnStyle: #9ACA40;
	--bgIconNotFocus: #EEF2F4;
	
	--bgTextAreaReadOnly: #EEF2F4;

	--bgBarTypeLine: #BAC9D1;
	--bgListBarTypeLine: #ECECEC;
	
	--bgPopup: #282C36;
	
	/******************* Radius **********************/
	--radiusBasic: 0.3rem;
	--radiusButtonRound: 1.5rem;


	/******************* Line Color **********************/
	--tableTrTdBetweenLine: #ECECEC;
	--inputLineBasic: #BAC9D1;
	--inputLineFocus: #282C36;
	--paginationLineBasic: #ECECEC;
	--paginnationLineFocus: #414550;

	/******************* width **********************/
	--widthButtonMinBasic: 9.2rem;
	--widthRegistLoginPage: 70rem;
	--widthButtonFull: 40rem;
	--widthButtonLarge: 30rem;
	--widthButtonMiddle: 17rem;
	--widthPopupMin: 30rem;
	--widthPopupMax: 40rem;
	--widthButtonPopup: 10rem;

	/******************* height **********************/
	--heightButtonBasic: 3rem;
	--heightButtonFull: 4rem;
	--heightButtonMiddle: 3.5rem;
	--heightButtonPopup: 3.5rem;
	--heightSignContentMin: 90rem;
	--heightInputBasic: 4.8rem;
	--heightEmptyDiv: 3rem;
	--heightPopupMin: 20rem;
	--heightListRow: 13rem;

	/******************* Padding  **********************/
	--paddingConentBasic: 3rem;
	--paddingInputBasic: 1.5rem; 
	--paddingButtonRound: 0 2rem 0 2rem;
	--paddingAlertBasic: 0 1rem 0 1rem;
	--paddingInfoBasic: 0 1rem 0 0.5rem;
	--paddingListRow: 2rem 0 2rem 0;

	/******************* margin **********************/
	--marginRightSubMenu: 8rem;
	--marginBetweenContentBlock: 3rem;

} 

* {
	box-sizing: border-box;
}

*::-webkit-scrollbar {
	width: 0.5rem;
	background-color: #ececec;
	border-radius: 0.3rem;
}
*::-webkit-scrollbar-thumb {
	background-color: #BAC9D1;
	border-radius: 0.3rem;
}

html body {
	margin: 0;
	font-family: 'Noto Sans KR', sans-serif;
	font-size: var(--fontSizeBasic);
	box-sizing: border-box;
	// height: 100vh;
	// width: 100vw;
	// height: calc(var(--vh, 1vh) * 100);
	scroll-behavior: smooth;
	background-color: var(--bgPageBasicColor);
	
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
button {
	margin: 0;
	padding: 0;
	font-family: "Noto Sans KR", sans-serif;
	border: none;
	font-style: normal;
	box-sizing: border-box;
	word-break: keep-all;
	font-weight: var(--fontWeightBasic);
}


//a, 
//a:hover,
//a:active,
//a:visited {
//	text-decoration: none;
//	color: #fff;
//}
//
///* textarea */
//textarea {
//	border: var(--lineWeightBasic) solid var(--lineColorBasic);
//	font-family: "Noto Sans KR", sans-serif;
//	font-size: var(--fontBasicSize);
//	resize: none;
//	border-radius: var(--radiusButtonBasic);
//	width: 100%;
//	padding: 10px
//}
//
//textarea:focus {
//	border: var(--lineWeightFocus) solid var(--lineColorFocus);
//	outline: none;
//	color: var(--fontBasicColor);
//}
//
//textarea::placeholder {
//	font-family: "Noto Sans KR", sans-serif;
//	font-size: var(--fontSizePlaceholder);
//}
//
//table {
//	border-collapse: collapse;
//	border-spacing: 0;
//}

/************************************** content basic css ***********************************/

main {
	width: var(--comContainerSize);
	//border: 1px solid red;
	display: flex;
	flex-direction: column;
	justify-content: center;
	//background-color: var(--bgContentBasicBgColor);
	border-radius: var(--radiusBasic);
	//padding: var(--paddingConentBasic);
}

li {
	list-style: none;
}

// 컨텐츠 페이지 공통 CONTAINER
.container {
	width: 100%;
	background-color: #fff;
	padding: var(--paddingConentBasic);
}

// 팝업의 BACKGROUND 공통
.comBG {
	background-color: var(--bgPopup);
	opacity: var(--opacityPopupBg);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
}

/************************************** Popup css ***********************************/
// 팝업의 공통 container
.contentPopupWrap {
	border-radius: var(--radiusBasic);
	background-color: #fff;
	z-index: 100;
	display: initial;
	//top: ${(props) => props.userMargin}px;
	position: fixed;
	top: 30%;
	//left: 50%;
	// transform을 사용하면 bottom line이 두꺼워지는 현상 발생
	//transform: translate(-50%, -50%);
	//flex-direction: column;
	// pageTitle이 기본적으로 좌측에 2rem의 margin을 갖고 있으므로... 
	padding: 2rem 3rem 3rem 1rem;
}

// 팝업 공통 Content 영역
.contentPopupContent {
	padding-left: 2rem;
}

.contentPopupTitle {
	flex-grow: 1;
}

// 팝업 타이틀과 X 버튼 영역
.contentPopupHead {
	display: flex;
}

// 팝업의 close 버튼
.contentPopupClose {
	background-image: url(${popup_CLoseButton});
	background-repeat: no-repeat;
	background-position: center right;
	cursor: pointer;
	width: 4rem;
	height: 4rem;
}

/************************************** tab menu css ***********************************/
.tabMenuArea {
	//border: 1px solid red;
	//display: inherit;
	//width: 90%;
}

.tabMenu {
	//border: 1px solid red;
	width: 50%;
	display: inline-block;
}

/************************************** tab Title css ***********************************/
.tabTitleArea {
	display: inherit;
	/*border: 1px solid blue;*/
}


.titleBar {
	width: 0.05rem;
	height: 2rem;
	background-color: var(--bgBarTypeLine);
	margin: 0 1rem 0 3rem;
	/*border: 1px solid purple;*/
	margin-top: 1.3rem;
}


/************************************** component basic css ***********************************/
.inputTitle {
	font-size: var(--fontSizeInputTitle);
	font-weight: var(--fontWeightMiddle);
	color: var(--fontInputTitleColor);
	padding-left: 0.5rem;
}

.emptyDivHeight {
	height: var(--heightEmptyDiv)
}
//// Table Grid div
//.tableGrid	{
//	width: 100%;
//	display: flex;
//	flex-grow: 1;
//}
//
////quill editor
//.ql-editor strong{
//  font-weight: var(--fontWeightBold);
//}
//
//// cursor
//.cursorPointer {
//	cursor: pointer;
//}
//
//// 한 Row에 Div들이 여러개 있는 경우 기본적인 display 설정
//.rowFlex {
//	display: flex;
//	justify-content: flex-start;	
//}


`

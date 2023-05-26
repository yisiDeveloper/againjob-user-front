const ssStorage = window.sessionStorage;
const lcStorage = window.localStorage;

/*************************************************************************************************

	Session Storage
	getItem 시에 || ""을 붙여주는 이유는 key가 null일 수 있다고 typescript에서 경고가 뜨기 때문

 **************************************************************************************************/
// 특정 값 가져오기
export function getSessionItem (key: string): any {
	let item: any = ssStorage.getItem(key);
	if (item === null || item === 'null' || item === undefined || item === 'undefined') {
		return false;
	} else {
		return JSON.parse(item);
	}
}

// 전체 가져오기
export function getAllSessionItem(): any {
	let tmpArr: object = {};
	let item: any;

	for(let i=0; i < ssStorage.length; i++) {
		let key: any = ssStorage.key(i);
		item = ssStorage.getItem(key);
		item = (item === null || item === undefined || item === 'undefined') ? false : JSON.parse(item);
		tmpArr = {...tmpArr, key: item}
	}
	return tmpArr;
}

// 세팅하기
export function setSessionItem (key: string, value: any): boolean {
	try {
		ssStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch(e) {
		return false;
	}
}

// 삭제하기
export function removeSessionItem (key: string): boolean {
	try {
		ssStorage.removeItem(key);
		return true;
	} catch(e) {
		return false;
	}
}

// 전체 삭제하기
export function removeAllSessionItem(): boolean {
	try {
		ssStorage.clear();
		return true;
	} catch(e) {
		return false;
	}
}


/*************************************************************************************************

	Local Storage

 **************************************************************************************************/
// 특정 값 가져오기
export function getLocalItem (key: string): any {
	let item: any = lcStorage.getItem(key);
	item = (item === null || item === undefined || item === 'undefined') ? false : JSON.parse(item);
	return item;
}

// 전체 가져오기
export function getAllLocalItem(): any {
	let tmpArr: object = {};
	let item: any;

	for(let i=0; i<lcStorage.length; i++) {
		let key: any = lcStorage.key(i)
		item = lcStorage.getItem(key);
		item = (item === null || item === undefined || item === 'undefined') ? false : JSON.parse(item);
		tmpArr = {...tmpArr, key: item}
	}

	return tmpArr;
}

// 세팅하기
export function setLocalItem (key: string, value: any): boolean {
	try {
		lcStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch(e) {
		return false;
	}
}

// 삭제하기
export function removeLocalItem (key: string): boolean {
	try {
		lcStorage.removeItem(key);
		return true;
	} catch(e) {
		return false;
	}
}

// 전체 삭제하기
export function removeAllLocalItem(): boolean {
	try {
		lcStorage.clear();
		return true;
	} catch(e) {
		return false;
	}
}
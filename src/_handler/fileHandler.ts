import { getFileData } from '@service'
import { postFileDownloadUrl } from '@env'

// 파일 등록
export const registFile = (file: object[], uploadFile: object[]) => {
	// console.log('선택한 파일은?', file);
	// console.log(file.length);

	// 선택한 파일이 없는 경우 종료
	if(file.length === 0) {
		return;
	}

	// alert('진행하나요?');

	// 배열은 0부터 시작하니... 현재 길이에 1을 더해준다.
	let tmpID = uploadFile.length + 1;
	// console.log('현재 file 길이', uploadFile.value.length);
	// console.log('배정된 번호는', tmpID);

	if(uploadFile.length === 3) {
		return {success: false, code: 'FILE_MSXCNT'};
	}

	let arr = Object.values(file);
	return {success: true, file: arr, id: tmpID}
	// const dd = uploadFile.value.concat(arr);
	// const dd = { ...uploadFile.value, arr }
}

// 파일 삭제
// export const deleteServerFile = async (id, acToken) => {
// 		// console.log('삭제시킬 파일의 아이디는', e.target.id);
// 		// 아래 구문을 updateData.splice(deleteID, 1); uploadFile.setter(updateData) 로만 작성하면 참조값만 바뀐 형태가 되는듯
// 		// 그래서 아래처럼 새로운 변수에 넣은다음 setState를 해야 렌더링이 일어남

// 		// 실제 파일을 삭제한다.
// 		const formData = new FormData();
// 		formData.append('dfSeq', id);

// 		let data;

// 		try {
// 			await formSubmit(postDocFileDelete, 'POST', formData, 'GENERAL', acToken)
// 				.then((response) => {
// 					data = response.data;
// 					console.log('axios delete result', data);
// 					return Promise.resolve(data);
// 				})
// 				console.log('여길 타나?', data);
// 		} catch(e) {
// 			console.log('아님 여기?');
// 			return Promise.reject({success: false, code: e.code});
// 		}
// 	};

// 현재 첨부된 파일 삭제
export const deleteFile = (fileId: string, uploadFile: any[]) => {
	// console.log('삭제시킬 파일의 아이디는', e.target.id);
	//  기존 데이터를 넣고
	const updateData = uploadFile;
	// console.log('uploadFile.value', uploadFile.value);

	// 아래 구문을 updateData.splice(deleteID, 1); uploadFile.setter(updateData) 로만 작성하면 참조값만 바뀐 형태가 되는듯
	// 그래서 아래처럼 새로운 변수에 넣은다음 setState를 해야 렌더링이 일어남

	// 만약 한개의 파일만 들어있다면
	try {
		if(uploadFile.length === 1) {
			return {success: true, file: []}
		} else {
			// console.log('삭제 전 데이터', updateData);
			// e.target.id가 문자로 오기 때문에 숫자형으로 변환
			let tmpData = updateData.filter((data) => data.id !== parseInt(fileId));
			// console.log('삭제 후 데이터', tmpData);
			return {success: true, file: tmpData}
		}
	} catch(e: any) {
		return {success: false, code: e.code}
	}
	// console.log(fileRef.current);
	// 강제 리 렌더링
	// console.log(uploadFile.value);
};

// 파일 다운로드
export const downloadFiles = async (id: any, name: string, division: string) => {

	let formData = new FormData();
	formData.append('division', division);
	formData.append('seq', id);

	try {
		await getFileData(postFileDownloadUrl, formData)
			.then((response) => {
				const blob: Blob = new Blob([response.data]);
				const fileUrl: string = window.URL.createObjectURL(blob);
				const link: HTMLAnchorElement = document.createElement('a');
				link.href = fileUrl;
				link.style.display = 'none';

				link.download = name;

				document.body.appendChild(link);
				link.click();
				link.remove();

				window.URL.revokeObjectURL(fileUrl);
			});
	} catch(e: any) {
		// console.log(e);
		return {success: false, code: e.code}
	}
};
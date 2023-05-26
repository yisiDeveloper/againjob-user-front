import React, { ReactElement, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import ImageResize from 'quill-image-resize-module-react';



interface EditorPropType {
	value: string,
	onChange: (text: string) => void,
	style?: object,
}

// Quill.register('modules/imageResize', ImageResize)

const adminModules: any = {
	toolbar: {
		container: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }, { size: [] }, { font: [] }],
			[{ align: [false, 'center', 'right'] }],
			[{ color: [] }, { background: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image', 'video'],
			['code-block'],
			['clean'],
		],
		handlers: {
			image: null,
		},
	},
	// imageResize: {
	// 	modules: ['Resize', 'DisplaySize'],
	// },
}

export const QuillEditorAdmin = ({ value, onChange, style = {} }: EditorPropType): ReactElement => {
	const quillRef = useRef<any>(null);

	// adminModules.toolbar.handlers.image = (): void => {
	// 	const input: any = document.createElement('input');
	// 	// input.setAttribute('type', 'file');
	// 	// input.setAttribute('accept', 'image/*');
	// 	input.click();
	// 	input.onchange = async () => {
	// 		const file = input.files[0];
	// 		if (quillRef.current) {
	// 			const editorEl = quillRef.current.editor;
	// 			const range = editorEl.getSelection(true);
		
	// 			// editorEl.insertEmbed(range.index, 'image', NO_IMAGE_URL);
	// 			editorEl.setSelection(range.index + 1);
		
	// 			// const list = await CommonService.uploadFile(file, 'column');
	// 			// const { path } = await CommonService.getFileInfo(list[0].id);
	// 			// input.setAttribute('data-img-id', list[0].id);
	// 			editorEl.deleteText(range.index, 1);
	// 			// editorEl.insertEmbed(range.index, 'image', path);
	// 		}
	// 	};
	// };

	// quillRef.clipboard.dangerouslyPasteHTML(0, value);
	// return <ReactQuill value={value} ref={quillRef} modules={modules} onChange={onChange} />;
	return <ReactQuill value={value} ref={quillRef} modules={adminModules} onChange={onChange} style={style} placeholder='내용을 입력해주세요.' />;
};


export const QuillEditorUser = ({ value, onChange, style = {} }: EditorPropType): ReactElement => {
	return <ReactQuill value={value} onChange={onChange} placeholder='내용을 입력해주세요.' style={style} />;
};
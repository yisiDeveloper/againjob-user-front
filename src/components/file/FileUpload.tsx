import React, {ChangeEventHandler, useRef} from 'react'
import {Alert, ButtonGeneral, ButtonRound, InfoAlert} from "../index"

interface fileComponentType {
    elName: string,
    infoMsgCode: string,
    registFileFunc: (e: React.ChangeEvent<HTMLInputElement>) => void,
    deleteFileFunc: (e: React.MouseEvent<HTMLSpanElement>, idx:number, name: string) => void,
    alertTitle: string,
    alertDP: boolean,
    fileValue: any[]
}
function FileUpload({
    elName,
    infoMsgCode,
    registFileFunc,
    deleteFileFunc,
    alertTitle,
    alertDP,
    fileValue
}: fileComponentType) {

    const fileRef = useRef<any>();
    const fileHandler = ((e: React.SyntheticEvent) => {
        e.preventDefault()

        if(fileRef) {
            fileRef.current.click();
        }

    })

    return (
        <>
            <div style={{display: 'flex'}}>
					<span onClick={fileHandler}><ButtonGeneral
                        title={'파일첨부'}
                        buttontype={'file'}
                        colortype={'file'}
                    /></span>
                <div className={'emptyDivWidth'} />
                <InfoAlert messageCode={infoMsgCode} />
                <input type={'file'} name={elName} onChange={registFileFunc} ref={fileRef} style={{display:'none'}} />
            </div>
            <Alert
                title={alertTitle}
                alertdisplay={alertDP}
            />
            {fileValue.length>0 && <div className={'emptyDivHeight'} />}
            <div>
                {
                    fileValue.map((data:any ,idx: any) => {
                        console.log('uploadFile here:', fileValue)
                        return (
                            <span key={idx}>
									<span onClick={(e) => deleteFileFunc(e, idx, elName)}>
										<ButtonRound
                                            title={data.name}
                                            buttontype={'file'}
                                        />
									</span>
									<div className={'emptyDivWidth'} />
								</span>
                        )
                    })
                }
            </div>
        </>
    )
}

export default React.memo(FileUpload)
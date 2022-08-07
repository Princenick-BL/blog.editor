import React ,{useState,useEffect} from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { uploadfile } from '../../services/files'
import { useArticleContext } from '../../contexts/article.context'

export default function ImageEditor({imageProps,edit,setEdit,index}) {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState(imageProps?.mediaUrl)
    const {state,dispatch} = useArticleContext()
    const [size,setSize] = useState({})

    const onSelectFile = async (e ) => {

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0]) 

    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleChangeHeader = async () =>{

            // I've kept this example simple by using the first image instead of multiple
        var poster = imageProps?.mediaUrl
        var formData = new FormData();
        formData.append("file", selectedFile);

        if(selectedFile){
            const res = await  uploadfile(formData)
            poster = res.url
            dispatch({
                type : "patch-image",
                payload : {
                    pos: index,
                    url : res.url, 
                }
            })
            setEdit(false)
        }
        dispatch({
            type : "patch-image-dim",
            payload : {
                pos: index,
                value : size, 
            }
        })
    
        
    }

    return (
        <>
        {imageProps?.mediaUrl &&
            <div className={styles.defaultPadding+ " " + styles.defaultImg} key={index}>
                <Image
                    src={imageProps?.mediaUrl}
                    width={imageProps?.width}
                    height={imageProps?.height}
                    onLoad={({ target }) => {
                        const { naturalWidth, naturalHeight } = target ;
                        setSize({
                            width:naturalWidth,
                            height:naturalHeight
                        })
                    }}
                    alt={imageProps?.alt}
                />
                {edit &&
                    <div className={styles.edit}>
                        <div style={{width:"100%"}}> 
                            <Image
                                src={preview || imageProps?.mediaUrl}
                                width={imageProps?.width}
                                height={imageProps?.height}
                                layout="responsive"
                                alt={imageProps?.alt}
                            />
                        </div>
                        <br></br>
                            <input type={"file"} onChange={(e)=>onSelectFile(e)}/>
                        <br></br>
                        <div className={styles.submit} onClick={(e)=>{handleChangeHeader()}} >Submit</div>

                    </div>
                }
            </div>
        }
        </>
    )
}

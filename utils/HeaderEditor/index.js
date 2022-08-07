import React, { useState,useEffect,useRef } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import {
    EditFilled
} from '@ant-design/icons';
import { useArticleContext } from '../../contexts/article.context'
import { uploadfile } from '../../services/files';

export default function HeaderEditor(props) {

    const wrapperRef = useRef()
    const [showEdit,setShowEdit] = useState(false)
    const [title,setTitle] = useState(props?.title)
    const [description,setDescription] = useState(props?.description)
    const [category,setCategory] = useState(props?.category)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState(props?.poster)

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

    const {state,dispatch} = useArticleContext()

    const handleChangeHeader = async () =>{

            // I've kept this example simple by using the first image instead of multiple
        var poster = props?.poster
        var formData = new FormData();
        formData.append("file", selectedFile);

        if(selectedFile){
            const res = await  uploadfile(formData)
            poster = res.url
        }
      
        
        dispatch({
            type : "patch-header",
            payload : {
                value : {
                    title : title,
                    description : description,
                    category : category,
                    poster : poster
                }
            }
        })
        setShowEdit(false)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
    
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowEdit(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);
    


    return (
        <header className={styles.header} ref={wrapperRef}>
            <div className={styles.edit}>
                <span className={styles.category +" "+styles.defaultPadding}>{props?.category}</span>
            
                <div className={styles.editBtn}>
                    <EditFilled onClick={(e)=>{setShowEdit(!showEdit)}}/>
                    {showEdit &&

                        <div className={styles.editBtnContent}>
                            <div>
                                <label>Catégory : </label>
                                <select  onClick={(e)=>{setCategory(e.target.value)}}>
                                    <option value="Houses">Houses</option>
                                    <option value="Cars">Cars</option>
                                    <option value="Jewelry">Jewelry</option>

                                </select>
                            </div>
                            <br></br>
                            <div>
                                <label>Title : </label>
                                <input type={"text"} value={title} onChange={(e)=>{setTitle(e.target.value)}}  placeholder='Set title'/>
                            </div>
                            <br></br>
                            <div>
                                <label>Description : </label>
                                <br></br>
                                <textarea type={"text"} value={description} onChange={(e)=>{setDescription(e.target.value)}}  placeholder='Set description'/>
                            </div>
                            <div className={styles.uploadsImage}>
                                <br></br>

                                <label style={{width: "calc( 100% - 1rem )"}}>Poster : </label>
                                <img
                                    className={styles.imagePreview}
                                    src={preview || props?.poster}
                                />
                                {/* <div 
                                    style={{backgroundImage : `url(${props?.poster})`}}
                                >
                                </div> */}
                                <br></br>
                                <input type={"file"} onChange={(e)=>onSelectFile(e)}/>
                                <br></br>

                            </div>
                            <div className={styles.submit} onClick={(e)=>{handleChangeHeader()}} >Submit</div>
                        </div>
                    }
                </div>
            </div>
            <h1 style={{fontSize:"2rem"}} className={styles.defaultPadding}>{props?.title}</h1>
            <address className={styles.defaultPadding}>
                <time
                    className="ampstart-byline-pubdate block bold my1"
                    dateTime="2016-12-13"
                >{`Updated at : ${props?.updatedAt}`}</time>
            </address>
            <div className={styles.defaultPadding}>
                    {props?.poster &&
                        <Image
                            src={props?.poster}
                            width="1280"
                            height="853"
                            layout="responsive"
                            alt="The final spritzer"
                            className={styles.img}
                            style={{width:"calc(100% - 2rem );"}}
                        /> 
                    }
            </div>
            <br></br>
        </header>
    )
}

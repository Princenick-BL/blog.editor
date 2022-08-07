import React,{useEffect, useState,useRef} from 'react'
import styles from './index.module.scss'
import { Dropdown, Menu, Space } from 'antd';
import {
    FontSizeOutlined,
    PictureOutlined ,
    InstagramOutlined,
    TwitterOutlined,
    PlaySquareOutlined
} from '@ant-design/icons';
import { useArticleContext } from '../../../contexts/article.context';
import { getFiles } from '../../../services/files';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
    return src
}

export default function AddObject() {

    const wrapperRef = useRef()

    const [show,setShow] = useState(false);
    const [showMedia,setShowMedias] = useState(false);
    const [medias,setMedias] = useState(false)
    const {state,dispatch} = useArticleContext()

    const handleAddText = () =>{
        dispatch({
            type : "add-object",
            payload :  {  value : 
                {
                    pos : 1,
                    type : "TEXT_BLOCK",
                    meta : {  },
                    content : `<p>Hello world</p>`
    
                },
            }
        })
    }

    const handleAddPicture = () =>{
        dispatch({
            type : "add-object",
            payload :  {  value : 
                {
                    pos : 2,
                    type : "IMAGE_BLOCK",
                    meta : {
                        width : 1280,
                        height : 700,
                        alt : state?.title
                    },
                    content : `https://picsum.photos/1024/700`

                },
            }
        })
    }

    useEffect(()=>{
        (async ()=>{
            const res = await getFiles('images')
            setMedias(res.files)
        })();
    },[showMedia])

    function useOutsideAlerter(ref) {
        useEffect(() => {
    
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowMedias(false)
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


    const Menu = () =>{
        return(
            <div className={styles.objects}>
                <div>
                    <div className={styles.object} onClick={(e)=>{handleAddText(e)}}>
                        <FontSizeOutlined />    
                    </div>
                    <div className={styles.object} onClick={(e)=>{handleAddPicture(e)}}>
                        <PictureOutlined />
                    </div>
                    <div className={styles.object}>
                        <InstagramOutlined />
                    </div>
                    <div className={styles.object}>
                        <TwitterOutlined />
                    </div>
                </div>
                <div className={styles.object+ " "+styles.mymedias+ " "+ (showMedia?styles.active : "")} onClick={(e)=>{setShowMedias(!showMedia)}}>
                    MEDIAS
                </div>
            </div>
        )
    }

    return (

            <div 
                className={styles.addObjectContainer}
            >
                <div 
                    className={styles.addObject}
                    onClick={(e)=>{setShow(!show)}}
                    >
                    +
                </div>
                {show &&
                    <div className={styles.view}>
                        <Menu/>
                        {showMedia &&
                            <div className={styles.medias} ref={wrapperRef}>
                                <div className={styles.form}>
                                    <input type={"text"} placeholder='Search ?'/>
                                </div>
                                <div className={styles.mediasContent}>
                                    {medias && medias?.map((file)=>{
                                        return(
                                            <div className={styles.img}>
                                                <Image
                                                    loader={myLoader}
                                                    src={file?.url}
                                                    width={100}
                                                    height={100}
                                                    layout="responsive"
                                                    alt={"Image"}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

    )
}


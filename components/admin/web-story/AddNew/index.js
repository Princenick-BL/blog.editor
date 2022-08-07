import React,{useState} from 'react'
import styles from './index.module.scss'
import {
    CloseOutlined
} from '@ant-design/icons';
import { postStory } from '../../../../services/stories';
import { useRouter } from 'next/router';

export default function AddNew() {

    const Router = useRouter()
    const [show,setShow] = useState(false)
    const [title,setTitle] = useState(false)
    const [category,setCategory] = useState("Cars")

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await postStory({title,category});

        Router.push(`/story-editor?key=${res._id}`)

    }

    return (
        <>
            <div className={styles.addNew} onClick={(e)=>{setShow(!show)}}>Add New</div>
            {show &&
                <div className={styles.overlay}>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <CloseOutlined
                            onClick={(e)=>{setShow(!show)}}
                            style={{
                                position : "absolute",
                                right : "0",
                                margin:"1rem",
                                backgroundColor : "var(--color-primary-light)",
                                borderRadius : "30px",
                                width: "30px",
                                height : "30px",
                                display:"flex",
                                alignItems : "center",
                                justifyContent : "center",
                                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                                cursor : "pointer"
                            }} 
                        />
                        <div className={styles.form}>

                            <div className={styles.field}>
                                <label>Title</label>
                                <textarea onChange={(e)=>{setTitle(e.target.value)}}  type={"text"} placeholder='Article Title' />
                            </div>
                            <br></br>
                            <div className={styles.field}  onChange={(e)=>{setCategory(e.target.value)}}>
                                <label>Category</label>
                                <select>
                                    <option value={"Cars"}>Cars</option>
                                    <option value={"Jewelry"}>Jewelry</option>
                                </select>
                            </div>
                            <br></br>
                            <input type={"submit"}  value='Submit'/>

                        </div>
                    </form>
                </div>
            }
        </>
    )
}

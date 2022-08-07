import React,{useEffect} from 'react'
import dynamic from 'next/dynamic'
import styles from './index.module.scss'
import { useArticleContext } from '../../contexts/article.context'
import ReactHtmlParser from 'react-html-parser'; 


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})




const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['code'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'color',
  'code',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align'
]

export default function Editor({children,edit,index}) {
    
   
    const {state,dispatch} = useArticleContext()

    const handleChange = (value) =>{
        dispatch({
            type : "patch-text",
            payload : {
                pos : index,
                value
            }
        })
    }

    



    return (
        <>
            {edit ? (
                <QuillNoSSRWrapper className={styles.edit} value={children} modules={modules} formats={formats} theme="snow"onChange={(e)=>{handleChange(e)}} />
            ):(
                <p className={styles.defaultText}>
                    <div> { ReactHtmlParser (children) } </div>


                    {/* {children} */}
                </p>
            )}
        </>
    )
}
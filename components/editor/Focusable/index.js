import React, { useState,useRef,useEffect } from 'react'
import styles from './index.module.scss'
import {
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';
import { useArticleContext } from '../../../contexts/article.context'

export default function Focusable({children,index}) {

  const [edit,setEdit] = useState(false)
  const wrapperRef = useRef(null);

  const {state,dispatch} = useArticleContext()

  const handleDelete = () =>{
    const accord = confirm("Êtes-vous sur de vouloir supprimer cet element ?")
    if(accord){
      dispatch({
          type : "remove",
          payload : {
              pos : index,
          }
      })

    }
  }


  function useOutsideAlerter(ref) {
    useEffect(() => {

      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEdit(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref,edit]);
}
useOutsideAlerter(wrapperRef);

  return (
    <div className={styles.focusable}   ref={wrapperRef} >
        <div className={styles.children}>
            {React.cloneElement(
                children, 
              {edit,setEdit}
            )}
        </div>
        <div className={styles.actions}>
          <div className={styles.item} onClick={(e)=>{handleDelete()}}>
            <DeleteFilled />
          </div>
          <div className={styles.item} onClick={(e)=>{setEdit(!edit)}}>
            <EditFilled />
          </div>
        </div>
    </div>
  )
}

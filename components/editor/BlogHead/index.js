import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import {
  HomeFilled
} from '@ant-design/icons';
import Link from 'next/link';
import { useArticleContext } from '../../../contexts/article.context';
import { patchArticle } from '../../../services/articles';


export default function BlogHead() {

  const {state,dispatch} = useArticleContext()

  const handleSave = async (e) =>{
    const res =  await patchArticle(state?.article);
    if(res){
      dispatch({
        type : 'init',
        payload : {
          value : res?.data
        }
      })
    }

  }

  return (       
    <nav className={styles.head}>
      <div style={{marginLeft : "1rem"}}>
        <Link href={"/articles"}>
          <HomeFilled/>
        </Link>
      </div>
      <div>DRAFT</div>
      <div className={styles.right}>
        <div className="sec-center"> 	
          <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
          <label className="for-dropdown" htmlFor="dropdown">Actions <i className="uil uil-arrow-down"></i></label>
          <div className="section-dropdown"> 
            <button onClick={(e)=>{handleSave(e)}}>Save <i className="uil uil-arrow-right"></i></button>
            <button>Publish<i className="uil uil-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </nav>
  )
}

import React ,{useState } from 'react'
import styles from './index.module.scss'
import Logo from '../../components/Logo'
import { useGlobalContext } from '../../contexts/global.context';
import { config } from '../../config';
import axios from 'axios'
import {useRouter} from 'next/router'
import {notification} from 'antd'

export default function Login() {

    const [showPass,setShowPass] = useState(false);
    const [loginId,setLoginId] = useState(false)
    const [loginPwd,setLoginPwd] = useState(false)
    const {state,dispatch} = useGlobalContext()
    const Router = useRouter();
    const [error,setError] = useState(false)

    const {redirect} = Router.query

    
    const login = async (e) =>{
        e.preventDefault()
        const res = await axios.post(`${config.API_ENDPOINT}/auth/login`,{
            email : loginId,
            password : loginPwd
        })
        if(!res.data?.error){
            window.localStorage.setItem("access_token", res?.data?.token);
            dispatch({ //onClose(false)
                // setNotification({
                //     text : res.data.message,
                //     type:"success"
                // })
                
                type:"LOGIN",
                payload:res?.data?.token,
            })
            notification.success({
                message:res.data.message,
            })
            Router.push(redirect)
           
        }
        if(res.data?.error){
            setError(res.data?.message)
            // setNotification({
            //     text : res.data?.message,
            //     type:"error"
            // })
        }
        
    }

    return (
        <div className={styles.login}>
            <div className={styles.content}>

                <h1>Admin</h1>

                {error && (
                    <div className={styles.notification}>
                        <div>{error}</div>
                    </div>
                )}

                <form onSubmit={(e)=>{login(e)}}>
                
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center"}}>
                        <input className={styles.inputText} type={"text"} placeholder='Identifiant' onChange={(e)=>{setLoginId(e.target.value)}}/>
                        <div className={styles.inputPassword}>
                            <input className={styles.input} type={showPass? "text": "password"} placeholder='Mot de pass' onChange={(e)=>{setLoginPwd(e.target.value)}}/>
                            {showPass ?(
                                <i onClick={(e)=>{setShowPass(false)}} className="fa fa-eye-slash" style={{fontSize:"24px",cursor:"pointer"}}></i>
                            ):(
                                <i onClick={(e)=>{setShowPass(true)}} className="fa fa-eye" style={{fontSize:"24px",cursor:"pointer"}}></i>
                            )}

                        </div>
                        <br></br>
                        <input type={"submit"} className={styles.submitBtn} />
                    </div>
                    
                </form>
            </div>
          
        </div>
    )
}

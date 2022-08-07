// pages/dashboard.jsx
import React,{useEffect} from 'react'
import {Fragment} from 'react'
import withAuth from "../middleware/withAuth";
import AdminLayout from '../layouts/admin.layout';
import {useRouter} from 'next/router'
import Loading from '../components/Loading';

function Dashboard() {

  const Router = useRouter()

  useEffect(()=>{
    Router.replace("/articles")
  },[])
  return (
    <Loading/>
  )
}


export default withAuth(Dashboard);
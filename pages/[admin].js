// pages/dashboard.jsx
import React,{useEffect} from 'react'
import {Fragment} from 'react'
import withAuth from "../middleware/withAuth";
import AdminLayout from '../layouts/admin.layout';
import Loading from '../components/Loading';
import {useRouter} from "next/router";

///
import Articles from '../components/admin/articles';
import Statistics from '../components/admin/statistics';
import WebStory from '../components/admin/web-story';

function Admin() {

  const router = useRouter()
  const { admin } = router.query;

  return (
    <AdminLayout>
        {getTab(admin)}
    </AdminLayout>
  )
}

function getTab(ats){
  if(ats === "articles"){
      return <Articles/>
  }else if (ats === "analytics"){
      return <Statistics/>
  }else if (ats === "web-stories"){
    return <WebStory/>
  }
}

export function getServerSideProps(context) {
  return {
      props: {params: context.params}
  };
}


export default withAuth(Admin);
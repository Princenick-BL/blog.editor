import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReadOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingFilled
} from '@ant-design/icons';
import GoogleAnalyticsIcon from './icons/analytics';
import WebStory from './icons/webStory';
import styles from './index.module.scss'
import { useGlobalContext } from '../contexts/global.context';
import { useRouter } from 'next/router';


const { Header, Sider, Content } = Layout;

const App = ({children}) => {

  const [collapsed, setCollapsed] = useState(true);
  const {state,dispatch} = useGlobalContext()

  const handlelogOut = () =>{
    dispatch({
      type:"LOGOUT"
    })
    window.location.reload()

  }

  const router = useRouter()
  const redirect = (dest) =>{
    router.push(dest)
  }

  return (
    <Layout style={{height:"100vh"}}>
      <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
           key={1}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height:"100%"}}
            items={[
                {
                  key: '1',
                  icon: <ReadOutlined /> ,
                  label: 'Articles',
                  onClick  : (e)=>redirect("/articles")

                },
                {
                  key: '2',
                  label: 'Web Stories',
                  icon: <WebStory/>,
                  onClick  : (e)=>redirect("/web-stories")
                },
                {
                  key: '3',
                  label: 'Analytics',
                  icon: <GoogleAnalyticsIcon/>,
                  onClick  : (e)=>redirect("/analytics")

                },
                
            ]}
        />
        <div>
        <Menu
          key={2}
            theme="light"
            mode="inline"
            style={{position:"absolute",bottom:"0",width:"100%"}}
            items={[
                {
                    key: '98',
                    icon: <UserOutlined/> ,
                    label: 'User',
                    children: [
                        { 
                            key: 'user-sub-1',
                            label: 'User', 
                            icon : <UserOutlined/>
                        },  
                        { 
                            key: 'user-sub-2',
                            label: 'Logout', 
                            icon : <LogoutOutlined />,
                            onClick  : (e)=>handlelogOut()
                        }
                    ],
    
                },
                {
                  key: '99',
                  icon: <SettingFilled/> ,
                  label: 'Settings',
                },
                {
                    key: '100',
                    icon: collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> ,
                    label: 'Collapse',
                    onClick  : (e)=>setCollapsed(!collapsed)
                },
            ]}
        />
       
        </div>
      </Sider>
      <Layout className="site-layout">
        
        <Content
          className={styles.content}
          style={{
            margin: '10px 10px',
            padding: 10,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
import React,{Fragment,useEffect,useState} from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import Image from 'next/image'
import { getSection } from '../../utils/article.utils'
import BlogHead from '../../components/editor/BlogHead'
import HeaderEditor from '../../utils/HeaderEditor'
import AddObject from '../../components/editor/addObject'
import MyMedias from '../../components/editor/MyMedias'
import { DragDropContext, Droppable, Draggable,resetServerContext } from 'react-beautiful-dnd';
import Focusable from '../../components/editor/Focusable'
import { useArticleContext } from '../../contexts/article.context'
import withAuth from "../../middleware/withAuth";
import { useRouter } from 'next/router'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { getStory } from '../../services/stories'
const { Panel } = Collapse;
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


//export const config = { amp: true };


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export  function Article({location}) {

  const Router = useRouter()
  const {key} = Router.query

  const {state,dispatch} = useArticleContext()

  useEffect(()=>{
    (async ()=>{
      if(key){
        const res = await getStory(key)
        if(res){
          dispatch({
            type : 'init',
            payload : {
              value : res?.data
            }
          })
        }
      }
    })();
  },[key])

  const {article} = state

  const [items,setItems] = useState(article?.sections)

  useEffect(()=>{
    setItems(article?.sections)
  },[article,state])


  
  const [fileList, setFileList] = useState([
    
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {

    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };



  return (
      <Fragment>
          <Head>
              <meta charSet="utf-8"/>
              <title>Hello, AMPs</title>
              <link rel="canonical" href={location}/>
          </Head>
          <BlogHead/>
          <Fragment>
              <main id="content" role="main" className={styles.main}>
                  {/* <AddObject/> */}
                  {/* <MyMedias/> */}
                  <br></br>
                  <br></br>
                  {article &&
                    <div className={styles.body}>
                      <div className={styles.left}>

                      </div>
                      <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className={styles.right}
                      >
                        <Panel 
                          header={"Meta data"}
                          key="1" 
                          className="site-collapse-custom-panel"
                        >
                          <form className={styles.form}>
                            <input type={"text"} placeholder='Title ...'/>
                            <br></br>
                            <textarea placeholder='Description ...'/>                            
                            <div style={{display : "flex",margin:"1rem",justifyContent:"space-between"}}>
                              <div style={{width:"45%"}}>
                              </div>
                              <div style={{display:"flex",flexWrap:"wrap"}}>
                                <ImgCrop rotate>
                                  <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                  >
                                    {fileList.length < 5 && '+ Upload'}
                                  </Upload>
                                </ImgCrop>
                                <div style={{margin:"1rem"}}>
                                  <div>Square</div>
                                  <Image
                                    width={100}
                                    height={100}
                                    layout="raw"
                                    src={"https://picsum.photos/640/640"}
                                  />
                                </div>
                                <div style={{margin:"1rem"}}>
                                  <div>Landscape</div>
                                  <Image
                                    width={100*853/640}
                                    height={100}
                                    layout="raw"
                                    src={"https://picsum.photos/640/853"}
                                  />
                                  
                                </div>
                                <div style={{margin:"1rem"}}>
                                  <div>Portrait</div>
                                  <Image
                                    width={100}
                                    height={100*853/640}
                                    layout="raw"
                                    src={"https://picsum.photos/853/640"}
                                  />
                                </div>
                                
                              </div>
                            </div>
                            <div style={{display: "flex",justifyContent:"space-between",width:"100%",flexDirection:"row-reverse"}}>
                              <input type={"submit"} value={"Save"}/>
                            </div>
                          </form>
                        </Panel>
                        <Panel header="Slide" key="2" className="site-collapse-custom-panel">
                          <p>{text}</p>
                        </Panel>
                       
                      </Collapse>
                      
                    </div>
                  }
              </main>

          </Fragment>
          
      </Fragment>
  )
}

export default withAuth(Article);


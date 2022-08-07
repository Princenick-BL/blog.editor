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
import { getArticle } from '../../services/articles'
import { useRouter } from 'next/router'

//export const config = { amp: true };


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export  function Article({location}) {

  const Router = useRouter()
  const {key} = Router.query

  const {state,dispatch} = useArticleContext()

  useEffect(()=>{
    (async ()=>{
      if(key){
        const res = await getArticle(key)
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

    
  const handleOnDragEnd =(result)=>{
    if (!result.destination) {
      return;
    }

    const new_items = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(new_items)
  }



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
                  <AddObject/>
                  {/* <MyMedias/> */}
                  <br></br>
                  <br></br>
                  {article &&
                    <article className={styles.recipeArticle}>
                        
                      <HeaderEditor
                        title = {article?.title}
                        poster = {article?.poster}
                        category = {article?.category}
                        updatedAt = {article?.updatedAt}
                      />
                      
                      <div className='main'>

                        <DragDropContext onDragEnd={handleOnDragEnd } >
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                // className={classNames('list', snapshot.isDraggingOver && 'draggingOver')}
                                {...provided.droppableProps}
                              >
                                {items?.map((section,index)=>(
                                  <Draggable key={index} draggableId={`${index}-id`} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        // className={classNames('item', snapshot.isDragging && 'dragging')}
                                        style={{width:' 100%',height :'100%'}}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Focusable
                                          index={index}
                                        >
                                          {getSection(section,index)}
                                        </Focusable>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>                       
                      </div>

                    
                      <br></br>
                      <br></br>
                      <br></br>

                    </article>
                  }
              </main>

          </Fragment>
          
      </Fragment>
  )
}

export default withAuth(Article);


import { SECTION_TYPE } from "../constant"
import Image from "next/image"
import styles from './index.module.scss'
import Editor from './TextEditor'
import ImageEditor from "./ImageEditor"

export const getSection = (section,index) =>{
    if(section){
        switch(section?.type){
            case SECTION_TYPE.TEXT_BLOCK :
                return(
                    <Editor
                        index={index}
                    >
                        {section?.content}
                    </Editor>
                )
      
            case SECTION_TYPE.IMAGE :

                const imageProps = {
                    mediaUrl : section?.content,
                    width : section?.meta?.width,
                    height : section?.meta?.height,
                    alt : section?.meta?.alt,
                }

                return(
                    <ImageEditor
                        imageProps = {imageProps}
                        index={index}
                    />
                )
            default :
                return ""
        }

    }
}
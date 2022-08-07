import React from 'react'
import Image from 'next/image';
import img from './amp-web-stories.png'

export default function WebStory() {
  return (
    <div style={{marginRight : "10px"}}>
        <Image
            src={img}
            width={14}
            height={14}
            layout='fixed'
            style={{width:"14px",marginRight:"10px"}}
        />
    </div>
  )
}

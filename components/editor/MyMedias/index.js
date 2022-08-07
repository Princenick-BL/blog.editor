import React from 'react'
import styles from './index.module.scss'
import {
    PlaySquareOutlined,
    PictureOutlined ,
} from '@ant-design/icons';

export default function MyMedias() {
  return (
    <div className={styles.medias}>
        <div className={styles.button}>
            <PictureOutlined/>
            <PlaySquareOutlined />
            Medias
        </div>

    </div>
  )
}

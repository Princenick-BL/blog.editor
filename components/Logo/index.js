import React from 'react'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Logo({style}) {
    return (
        <Link href='/'><a className={styles.logo} style={style}><div>My BLog</div><div className={styles.c}>©</div></a></Link>
    )
}

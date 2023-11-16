import React, { FC } from 'react'
import styles from './notFound.module.css'

const NotFoundPage:FC = () => {
  return (
    <div className={styles.page}>
        <h1 className ='text text_type_digits-large text_color_error'>404</h1>
        <p className={`text_type_main-large ${styles.description}`}> Нам очень жаль, но такой страницы не существует</p>

    </div>
  )
}

export default NotFoundPage
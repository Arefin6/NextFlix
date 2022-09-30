/* eslint-disable react/jsx-key */
import React from 'react';
import styles from '../../styles/sectionCard.module.css'
import Card from './Card';
import  Link  from 'next/link';
import  clsx  from 'classnames'

const SectionCard = ({title,videos=[],size,shouldWrap=false}) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper,shouldWrap && styles.wrap)}>
                {videos.map((video,idx)=>{
                   return (
                     <Link href={`/video/${video.id}`} key={video.id}>
                       <a>
                       <Card  imgUrl ={video.imgUrl}  size={size} id={idx} videoId={video.id} />  
                        </a>  
                     </Link>  
                     
                   )
                   }) 
                }
              
            </div>   
        </section>
    );
};

export default SectionCard;
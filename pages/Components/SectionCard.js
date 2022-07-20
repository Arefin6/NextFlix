import React from 'react';
import styles from '../../styles/sectionCard.module.css'
import Card from './Card';
import { Link } from 'next/link';

const SectionCard = ({title,videos=[],size}) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {videos.map((video,idx)=>{
                   return (
                     <Card  imgUrl ={video.imgUrl} key={idx} size={size} id={idx} videoId={video.id} />  
                   )
                   }) 
                }
              
            </div>   
        </section>
    );
};

export default SectionCard;
import React from 'react';
import styles from '../../styles/sectionCard.module.css'
import Card from './Card';

const SectionCard = ({title,videos,size}) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {videos.map((video,idx)=>{
                   return <Card key={idx} imgUrl ={video.imgUrl} size={size} id={idx} />  
                   }) 
                }
              
            </div>   
        </section>
    );
};

export default SectionCard;
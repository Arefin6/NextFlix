import React from 'react';
import styles from '../../styles/sectionCard.module.css'
import Card from './Card';

const SectionCard = ({title}) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
                id={1}
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               /> 
                <Card
                imgUrl ="/static/clifford.jpg"
                size="large"
               />  
            </div>   
        </section>
    );
};

export default SectionCard;
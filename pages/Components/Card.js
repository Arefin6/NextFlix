import Image from 'next/image';
import React from 'react';
import Styles from '../../styles/Card.module.css';
import { useState } from 'react';
import { motion } from "framer-motion"

const Card = ({imgUrl ="/static/clifford.jpg",size="medium"}) => {

    const [imageSrc,setImageSrc] = useState(imgUrl)

    const cardMaps ={
        small:Styles.smItem,
        medium:Styles.mdItem,
        large:Styles.lgItem
    }

    const handleError = () =>{
        setImageSrc('/static/clifford.jpg')
    }
    return (
        <div>
            <motion.div  whileHover={{ scale: 1.2 }} className={`${cardMaps[size]} ${Styles.imgMotionWrapper}`}>
                <Image
                    src={imageSrc}
                    layout="fill"
                    alt="img"
                    onError={handleError}
                    className={Styles.cardImg}
                />
            </motion.div>
            
        </div>
    );
};

export default Card;
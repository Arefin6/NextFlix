/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from "classnames";
import styles from '../../styles/video.module.css';
import { getYoutubeVideoById } from '../../libs/videos';
import Navbar from '../Components/Navbar';
import Like from '../Components/icons/like-icon';
import DisLike from '../Components/icons/dislike-icon';


Modal.setAppElement("#__next")

export async function getStaticProps(context) {
    const videoId = context.params.videoid;
    const videoArray = await getYoutubeVideoById(videoId);
    return {
      props: {
        video:videoArray.length >0 ? videoArray[0]:{},
      },
      revalidate: 10, // In seconds
    };
  }

  export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoid) => ({
      params: { videoid },
    }));
  
    return { paths, fallback: "blocking" };
  }

const Video = ({video}) => {
    const router = useRouter()
    const videoId = router.query.videoid;
    const {title,publishTime,description,channelTitle,statistics:{viewCount}={viewCount:0}}= video;
    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDisLike, setToggleDisLike] = useState(false);

   const getStatsData = async()=>{
    const response = await fetch(`/api/stats?videoId=${videoId}`,{
     method:"GET" 
    });
    const data = await response.json()
    if(data.length >0){
      const favourited = data[0].favourited;
       
      if(favourited === 0){
        setToggleDisLike(true)
      }
      else if(favourited === 1){
        setToggleLike(true)
      }
    } 
   } 
    

   useEffect(()=>{
     getStatsData();
   },[]) 


   const runRatingService = async (favourited) =>{
    return await fetch('/api/stats',{
      method:"POST",
      body:JSON.stringify({
        videoId,
        favourited
      }),
      headers:{
        "Content-Type": "application/json",
       },
     });
   }


    const handleToggleLike = async() =>{
       const val =  !toggleLike
       setToggleLike(val)
       setToggleDisLike(toggleLike)
       const rating = val ? 1 :0
       const response = await runRatingService(rating)  
      
    } 

    const handleToggleDisLike = async () =>{
      const val = !toggleDisLike
       setToggleDisLike(val)
       setToggleLike(toggleDisLike)
       const rating = val ? 0 :1
       const response = await runRatingService(rating)  
   
    }

    return (
        <div className={styles.container}>
            <Navbar/>
           <Modal isOpen={true} contentLabel="Watch The video" className={styles.modal}  onRequestClose={() =>router.back()} overlayClassName={styles.overlay}>
            <iframe
            id="ytplayer"
            className={styles.videoPlayer}
            type="text/html"
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            frameBorder="0"
            ></iframe>
             <div className={styles.likeDislikeBtnWrapper}>
               <div className={styles.likeBtnWrapper}>
                <button onClick={handleToggleLike}>
                  <div className={styles.btnWrapper}>
                          <Like selected={toggleLike}/>
                  </div>
                </button>
               </div>
               <button onClick={handleToggleDisLike}>
                <div className={styles.btnWrapper}>
                      <DisLike selected={toggleDisLike}/>
                 </div>
               </button>
             </div>
             
            
            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                        <p className={styles.publishTime}>{publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast:</span>
                            <span className={styles.channelTitle}> {channelTitle}</span>
                        </p>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>
                        </div>
                </div>
            </div>
            </Modal>
        </div>
    );
};

export default Video;
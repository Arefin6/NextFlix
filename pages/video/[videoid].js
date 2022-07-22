import React from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from "classnames";
import styles from '../../styles/video.module.css';


Modal.setAppElement("#__next")

const Video = () => {
    const router = useRouter()
    const videoId = router.query.videoid;
    return (
        <div className={styles.container}>
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
            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                        <p className={styles.publishTime}>{"2021=22-22"}</p>
                        <p className={styles.title}>{"life is fucked"}</p>
                        <p className={styles.description}>{"Fucking toy"}</p>
                        </div>
                        <div className={styles.col2}>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{"Fucking Channel"}</span>
                        </p>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{"1M"}</span>
                        </p>
                        </div>
                </div>
            </div>
            </Modal>
        </div>
    );
};

export default Video;
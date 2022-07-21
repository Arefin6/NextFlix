import React from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';


Modal.setAppElement("#__next")

const Video = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
           <Modal isOpen={true} contentLabel="Watch The video" className={styles.modal}  onRequestClose={() =>router.back()} overlayClassName={styles.overlay}>
              <div>Modal Body</div>
           </Modal>
        </div>
    );
};

export default Video;
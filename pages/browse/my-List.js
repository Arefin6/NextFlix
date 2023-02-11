import Head from 'next/head';
import React from 'react';
import Navbar from '../Components/Navbar';
import SectionCard from '../Components/SectionCard';
import styles from '../../styles/mylist.module.css';
import { redirectUser } from '../../utils/redirectUser';
import { getMyList } from '../../libs/videos';

export async function getServerSideProps(context){

  const {userId,token}  = await redirectUser(context)  
  const myListVideos = await getMyList(userId,token);

  return {
    props: { myListVideos},
  };

}
 


const MyList = ({myListVideos}) => {
  console.log({myListVideos})
    return (
        <div>
            <Head>
                <title>My List</title>
            </Head>
            <main className={styles.main}>
              <Navbar></Navbar>
              <div className={styles.sectionWrapper}>
              <SectionCard
                shouldWrap={true}
                title={"My List"}
                videos={myListVideos}
                size="small"
                />
              </div>
            </main>
        </div>
    );
};

export default MyList;
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "./Components/Banner";
import Navbar from "./Components/Navbar";
import SectionCard from "./Components/SectionCard";
import { getVideos, getPopularVideos, getWatchItAgainVideos } from "./../libs/videos";


export async function getServerSideProps() {
  const userId ="did:ethr:0xc89665b5EF2A776098643993723AB8639FF5f703";
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweGM4OTY2NWI1RUYyQTc3NjA5ODY0Mzk5MzcyM0FCODYzOUZGNWY3MDMiLCJwdWJsaWNBZGRyZXNzIjoiMHhjODk2NjViNUVGMkE3NzYwOTg2NDM5OTM3MjNBQjg2MzlGRjVmNzAzIiwiZW1haWwiOiJhcmVmaW5ob3NzYWluM0BnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjY0MDMyNDQ0LCJleHAiOjE2NjQ2MzcyNDQsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHhjODk2NjViNUVGMkE3NzYwOTg2NDM5OTM3MjNBQjg2MzlGRjVmNzAzIn19.p2ftO7wVC0bsD6U4uSACVENYuh8c1bMnVLC7SugPnYg";
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  const watchItAgainVideos = await getWatchItAgainVideos(userId,token);


  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos,watchItAgainVideos },
  };
}


export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
  watchItAgainVideos
})
{
  return (
    <div className={styles.container}>
      <Head>
        <title>NetFlix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar username={"arefin@gmail.com"} />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.jpg"
          videoId ="4zH5iYM4wJo"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title={"Disney"} videos={disneyVideos} size="large" />
          <SectionCard title={"Watch It Again"} videos={watchItAgainVideos} size="small" />
          <SectionCard title={"Travel"} videos={travelVideos} size="small" />
          <SectionCard
            title={"Productivity"}
            videos={productivityVideos}
            size="medium"
          />
          <SectionCard title={"Popular"} videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}

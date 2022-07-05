import videoTestData from "../data/videos.json";

export const getVideos = async()=>{

    const apikey = process.env.Youtube_API_Key;
    
    const url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${apikey}`;

    const response = await fetch(url);

    const data = await response.json()

    return data.items.map(item =>{
        return{
            title: item.snippet.title,
            imgUrl:item.snippet.thumbnails.high.url,
            id:item?.id?.videoId
        }
    });
}
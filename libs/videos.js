import videoTestData from "../data/videos.json";

export const getVideos = ()=>{
    return videoTestData.items.map(item =>{
        return{
            title: item.snippet.title,
            imgUrl:item.snippet.thumbnails.high.url,
            id:item?.id?.videoId
        }
    });
}
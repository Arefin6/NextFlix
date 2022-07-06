
export const getCommonVideos = async(URL)=>{

    try {
        
        const Youtube_API_Key = process.env.Youtube_API_Key;

        const BASE_URL = "youtube.googleapis.com/youtube/v3";
    
        const url=`https://${BASE_URL}/${URL}&maxResults=25&key=${Youtube_API_Key}`;
    
        const response = await fetch(url);
    
        const data = await response.json();

         if(data?.error){
            console.error("Youtube API error", data.error);
            return [];
         }
        
        return data.items.map(item =>{
            const id = item?.id?.videoId || item.id;
            return{
                title: item.snippet.title,
                imgUrl:item.snippet.thumbnails.high.url,
                id
            }
        });

    } 
    catch (error) {     
        console.error("Something went wrong with video library", error);
        return [];
    }
   
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
 };

 export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=BD`;
    return getCommonVideos(URL);
 };
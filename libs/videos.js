import { getMyListVideos, getWatchedVideos } from "./db/hasura";

export const getCommonVideos = async (URL) => {
  try {
    const Youtube_API_Key = process.env.Youtube_API_Key;

    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const url = `https://${BASE_URL}/${URL}&maxResults=25&key=${Youtube_API_Key}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      const snippet = item.snippet; 
      return {
        title: snippet.title,
        imgUrl:`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        description:snippet.description,
        channelTitle:snippet.channelTitle,
        publishTime:snippet.publishedAt,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
        id,
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=BD`;
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) =>{
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
}
export const getWatchItAgainVideos = async (userId,token) =>{
  const videos = await getWatchedVideos(userId,token);
  return videos?.map(video =>{
    return{
      id:video?.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }
  })
}

export const getMyList = async (userId,token) =>{
  const videos = await getMyListVideos(userId,token);
  return videos?.map(video =>{
    return{
      id:video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }
  })
}

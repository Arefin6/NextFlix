import React from 'react';
import { useRouter } from 'next/router';

const Video = () => {
    const router = useRouter()
    console.log(router)
    return (
        <div>
           <h2>Video Page</h2> 
        </div>
    );
};

export default Video;
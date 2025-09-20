import { useUser } from '@clerk/nextjs';
import { StreamVideoClient, StreamVideo,} from '@stream-io/video-react-sdk';
import { error } from 'console';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function App({children}:{children:ReactNode}) {
  const {user,isLoaded}=useUser()
  const [videoClient,setvideoClient]=useState<StreamVideoClient>()


    useEffect(()=>{
       if(!user||!isLoaded) return
       if(!apiKey) throw new Error('Stream api key is missing')
       const client=new StreamVideoClient({
      apiKey,
      user:{
        id:user?.id,
        name:user?.username || user?.id,
        image:user?.imageUrl
      },
      tokenProvider:
      })
    },[user,isLoaded])


  return (
    <StreamVideo client={videoClient}>
       
    </StreamVideo>
  );
}

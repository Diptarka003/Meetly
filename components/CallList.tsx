// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Lcircle from './Lcircle'
import { toast } from 'sonner'

const CallList = ({type}:{type:'upcoming'|'ended'|'recordings'}) => {
    const {endedCalls,upcomingCalls,callrecordings,isLoading}= useGetCalls()
    const router=useRouter()
    const [recordings,setrecordings]=useState<CallRecording[]>([])
    const getCalls=()=>{
        switch (type) {
            case 'upcoming':
                return upcomingCalls
            case 'ended':
                return endedCalls    
            case 'recordings':
                return recordings 
            default:
                return [];
        }
    }
    const getNoCallsMessage=()=>{
        switch (type) {
            case 'upcoming':
                return "No Upcoming calls"
            case 'ended':
                return "No previous calls"    
            case 'recordings':
                return "No Recordings"
            default:
                return '';
        }        
    }
    useEffect(() => {
      const fetchRecordings = async () => {
      try{
        const callData = await Promise.all(callrecordings.map((meeting) => meeting.queryRecordings()));
        const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)
        setrecordings(recordings);
      }
      catch(error)
      {
         toast("Try again Later")
      }
      if (type === 'recordings') fetchRecordings()
    }}, [type, callrecordings])

    const calls=getCalls()
    const noCallMessage=getNoCallsMessage()
    if(isLoading) return <Lcircle/>
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length>0? calls.map((meeting:Call|CallRecording)=>(
            <MeetingCard
               	key={(meeting as Call).id}
                icon={
                type === 'ended'
                    ? '/icons/previous.svg'
                    : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
                }
                title={(meeting as Call).state?.custom?.description?.substring(0, 20) || 'Personal Meeting'}
                date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                isPreviousMeeting={type === 'ended'}
                buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                buttonText={type === 'recordings' ? 'Play' : 'Start'}
                handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}          
            />
         )):
         (<h1>{noCallMessage}</h1>)
        }
    </div>
  )
}

export default CallList
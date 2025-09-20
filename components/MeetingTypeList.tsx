'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
const MeetingTypeList = () => {
 const [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
 const createMeeting=()=>{
     const user=useUser;
     
 }



 const router=useRouter()
 return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
       <HomeCard
       img='/icons/add-meeting.svg'
       title="New Meeting"
       description="Start an Instant meeting"
       handleClick={()=>setMeetingState('isInstantMeeting')}
       className="bg-orange-400"
       />
       <HomeCard
       img='/icons/join-meeting.svg'
       title="Join Meeting"
       description="Via an invitation Link"
       handleClick={()=>setMeetingState('isJoiningMeeting')}
       className="bg-blue-500"
       />
       <HomeCard
       img='/icons/schedule.svg'
       title="Schedule Meeting"
       description="Plan your meeting"
       handleClick={()=>setMeetingState('isScheduleMeeting')}
       className="bg-yellow-400"
       />
       <HomeCard
       img='/icons/recordings.svg'
       title="View Recordigs"
       description="Check out your Recordings"
       handleClick={()=>router.push('/recordings')}
       className="bg-purple-400"
       />
       <MeetingModal
       isOpen={meetingState==='isInstantMeeting'}
       OnClose={()=>setMeetingState(undefined)}
       title="Start an Instant Meeting"
       className="text-center"
       buttonText="Start Meeting"
       handleClick={createMeeting}
       />
    </section>

    
  )

}

export default MeetingTypeList
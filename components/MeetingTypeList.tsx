'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
const MeetingTypeList = () => {
 const [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
 const user=useUser()
 const client =useStreamVideoClient()
 const [values,setvalues]=useState({
  dateTime: new Date(),
  link:'',
  description:''
 })
 const [callDetails,setcallDetails]=useState<Call>()

 const createMeeting=async()=>{
    if(!client || !user) return;
     try{
        const id= crypto.randomUUID()
        const call=client.call('default',id)
        const startsAt=values.dateTime.toISOString() || new Date(Date.now()).toISOString()
        const description=values.description|| "Instant Meeting"
        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              description
            }
          }
        })
        setcallDetails(call)
        if(!values.description)
        {
          router.push(`meeting/${call.id}`)
        }
     }
     catch(error)
     {
       console.log(error)
     }

 }



 const router=useRouter()
 const meetingLink=${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}
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
       {!callDetails?
           <MeetingModal
              isOpen={meetingState==='isScheduleMeeting'}
              OnClose={()=>setMeetingState(undefined)}
              title="Create Meeting"
              handleClick={createMeeting}
            >
                <div className="flex flex-col gap-2.5">
                    <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
                    <Textarea className="border-none bg-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e:any) => {
                      setvalues({...values, description: e.
                      target.value})
                    }}/>
                </div> 
                <div className='flex w-full flex-col gap-2.5'>
                    <label className="text-base text-normal leading-[22px] text-sky-2">Select Date and Time</label>
                    <ReactDatePicker
                      selected={values.dateTime}
                      onChange={(date) => setvalues({...values,
                      dateTime: date! })}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full rounded bg-dark-3 p-2
                      focus:outline-none"
                    />
                </div>
            </MeetingModal>:
            <MeetingModal
              isOpen={meetingState==='isInstantMeeting'}
              OnClose={()=>setMeetingState(undefined)}
              title="Meeting Created"
              className="text-center"
              buttonText="Start Meeting"
              handleClick={()=>{
                navigator.clipboard.writeText(meetingLink)
              }}
              image='/icons/checked.svg'
              buttonIcon='/icons/copy.svg'
              buttonText='Copy Meeting Link'
            />
       }


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
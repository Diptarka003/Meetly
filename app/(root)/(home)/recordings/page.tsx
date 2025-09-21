
import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
       <div className='text-3xl font-bold'>
         <CallList type='recordings'/>
       </div>
    </section>
  )
}

export default Recordings
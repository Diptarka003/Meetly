import Image from 'next/image'
import React from 'react'

const Lcircle = () => {
  return (
    <div>
          return (
            <div className='flex-center h-screen w-full'>
                <Image
                src='/icons/loading-circle.svg'  
                alt='Loader'
                height={50}
                width={50}      
                />
            </div>
    </div>
  )
}

export default Lcircle
'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname=usePathname() 
    return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1A1F25]
    text-white p-6 pt-28 max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link)=>{
                const isActive= pathname===link.route
                return(
                    <Link
                    href={link.route}
                    key={link.label}
                    className={cn('flex gap-4 items-center rounded-lg p-4 justify-start ',
                        {'bg-blue-400':isActive})}
                    >
                    <Image
                    src={link.imageUrl}
                    alt={link.label}
                    height={24}
                    width={24}
                    />
                    <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar
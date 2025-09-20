'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
const MobileNav = () => {
 const pathname=usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Image src="/icons/hamburger.svg" alt="hamburger icon" height={36} width={36} className='cursor-pointer sm:hidden'/>
            </SheetTrigger>
            <SheetContent side='left' className='border-none bg-[#1A1F25]'>
                <Link href="/" className='flex items-center gap-1'>
                    <Image
                    src='/icons/logo.svg'
                    alt='Meetly Logo'
                    height={32}
                    width={32}
                    />
                    <p className='text-[26px] font-extrabold text-white'>Meetly</p>
                </Link>
                <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                             {sidebarLinks.map((link)=>{
                                    const isActive= pathname===link.route
                                    return(
                                      <SheetClose asChild key={link.route}>
                                        <Link
                                        href={link.route}
                                        key={link.label}
                                        className={cn('flex gap-4 items-center rounded-lg p-4 w-full max-w-60 ',
                                            {'bg-blue-400':isActive})}
                                        >
                                        <Image
                                        src={link.imageUrl}
                                        alt={link.label}
                                        height={20}
                                        width={20}
                                        />
                                        <p className='font-semibold'>{link.label}</p>
                                        </Link>
                                      </SheetClose>
                                    )
                                })}
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
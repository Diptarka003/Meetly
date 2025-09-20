import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { cn } from '@/lib/utils'
interface MeetingModalProps{
   isOpen:boolean,
   OnClose:()=>void,
   buttonText?:string,
   title?:string,
   handleClick:()=>void,
   className?:string
   children?:ReactNode
   image?:string
   buttonIcon?:string
}
const MeetingModal = ({isOpen,OnClose,buttonText,title,handleClick,className,children,image,buttonIcon}:MeetingModalProps) => {
  return (
        <Dialog open={isOpen} onOpenChange={OnClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-[#1A1F25] px-6 py-9 text-white">
            <div className="flex flex-col gap-6">
                {image && (
                <div className="flex justify-center">
                    <Image 
                    src={image}
                    alt="image" 
                    width={72}
                    height={72} />
                </div>
                )}
                <DialogTitle className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</DialogTitle>
                {children}
                <Button className="bg-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
                    {buttonIcon &&(
                        <Image src={buttonIcon} alt="ButtonIcon" height={13} width={13}/>
                    )} 
                    {buttonText || 'Schedule Meeting'}
                </Button>
            </div>
            </DialogContent>
        </Dialog>
  )
}

export default MeetingModal
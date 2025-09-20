'use server'

import { useUser } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey=process.env.NEXT_PUBLIC_STREAM_API_KEY
const apisecret=process.env.STREAM_SECRET_KEY

export const tokenProvider=async()=>{
    const user=await currentUser()
    if(!user) throw new Error('No User Found')
    if(!apiKey) throw new Error('No User Found')
    if(!apisecret) throw new Error('No User Found')
    
    const client=new StreamClient(apiKey,apisecret)
    const vailidity = 60 * 60;
    const token=client.generateUserToken({user_id:user.id, validity_in_seconds:vailidity });
    return token;
}

'use server'

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"



export const get_server_session = async () =>{

    const session = await getServerSession(nextAuthOptions)
   
    return session

}
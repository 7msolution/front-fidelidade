import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import nookies from 'nookies'
import { use } from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'



interface userProps extends User{
           
            
              accessToken: string,
              empresaId : number
              role: number,
 
}
export const nextAuthOptions : NextAuthOptions = {
 
    secret: process.env.AUTH_SECRET,

    providers: [
        CredentialsProvider({
          
          name: 'credentials',
       
          credentials: {
            email: { label: "email", type: "text", placeholder: "email" },
            password: { label: "password", type: "text" }

          },

          async authorize(credentials, req) {

            const res = await fetch("http://localhost:3335/login", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })

           
          const data = await res.json()


          const user : userProps = {
            id: data?.user.id,
            email: data?.user.email,
            role: data?.user.role,
            accessToken: data?.token,
            empresaId: data?.user.empresaId,
            name: data?.user.name
          }

        

          return user

          }
        })
      ],

      callbacks: { 
        async jwt ({ token, user , session}) {
          

          return ({...token, ...user})
          
          },

        async session  ({ session, user, token }) {    
     
           session.user.empresaId = token.empresaId
           session.user.role = token.role
           session.user.id_user = token.id
           session.user.name = token.name

        return {session, user, token}
        }

  }

}

setCookie(null, 'fromClient', 'value', {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
})

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
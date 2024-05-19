'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { env } from "process";
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify";
import z, { any } from "zod"
import 'react-toastify/dist/ReactToastify.css';
import { get_server_session } from "@/action/get-session-server";

const SignUpSchema = z.object({
    email: z.string().max(200),
    password : z.string().max(200),
  });


  type SignUpSchemaType = z.infer<typeof SignUpSchema>;


export default function Signin() {


    const route = useRouter();

    const {data : session } = useSession();

    async function handleLogin(data : any) {

    

        const email = data.email
        const password = data.password
        const result = await signIn('credentials',{
         email,
         password,
          redirect: false
        })

        if(result?.status == 401){
            toast.error("Login não autorizado")
            return
        }
    
        if(result?.status === 200){

          const session = await get_server_session()

          const cookies = parseCookies()
      
          setCookie(null, 'token-fide', session?.token.accessToken, {

            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })
          
          if(session?.session.user.role == 1){
            route.push("/dashboard")
          }else{
            route.push("/cliente-acesso")
          }
        
        }
      }


  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }, 
        
  
      } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)
      
    });
  
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
        <ToastContainer></ToastContainer>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
      
          <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(handleLogin)} >
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
              
                  type="password"
                  autoComplete="current-password"
                  required
                  className="
                      block w-full rounded-md border-0 py-1.5 
                      text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                      focus:ring-indigo-600 sm:text-sm sm:leading-6
                      px-2
                      "
                      {...register('password')}
                />
              </div>
            </div>

            <div className="mt-7">
              <button type="submit" value="submit" className=" mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
               text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
               Acessar
              </button>
            </div>
       

          <p className="mt-10 text-center text-sm text-gray-500">
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              
            </a>
          </p>
          </form>
              <div>
        
              </div>
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/new" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
      
        </div>
      </>
    )
  }
  
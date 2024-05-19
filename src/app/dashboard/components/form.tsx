"use client"

import {  Transition } from '@headlessui/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import api from '@/api/api'
import { useState , useRef, useEffect, Fragment } from 'react'
import {  toast, ToastContainer } from 'react-toastify';
import { AlertTriangle, ArrowBigRight, Gem, Gift } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import PontuacaoModal from './pontuacao-modal'
import { cpf } from 'cpf-cnpj-validator'; 
import ResumoCampanha from '@/app/campanha/resumo-campanha'
import { getSessionData } from "@/app/libs/getSession"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchCheck, LockKeyhole } from 'lucide-react';
import { get_server_session } from "@/action/get-session-server"

import DialogEmail from "./dialog-email"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface cpfProps {
  cpf : string
}

interface idEmpresa {
  id_empresa : number | undefined
}

export const mask = (v: string) => {
  v = v.replace(/\D/g, "")

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  } else {
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
  }

  return v
}

const SignUpSchema = z.object({
    cpf: z.string().max(20),

  });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;


export default  function FormDash() {
  const cancelButtonRef = useRef(null)



  const [idEmpresa , setIdEmpresa] = useState(0)

  const [cpfComponente, SetcpfComponente] = useState("")
  const formRef = useRef(null);
  const [valor, setValor] = useState('')
  const [key,  Setkey] = useState(0)
  const [cpfstado , Setcpfstado] = useState('')
  const [botaPontual , SetbotaPontual] = useState(false)
  const [nomeCPF , SetNomeCpf] = useState("")
  const [validaEmail, SetValidaEmail] = useState(true)
  const [validaEmailModal, SetValidaEmailModal] = useState(false)
  const [defaultOpen, SetdefaultOpen] = useState(false)
  
  useEffect(()=>{
      async function fetchData() {
        const sessionData = await getSessionData();  
        setIdEmpresa(sessionData?.session.user.empresaId)
      }
    fetchData()}, [])

    const handleClearForm = () =>{
          reset();
          SetbotaPontual(false);
          setValor('');
          Setkey(key + 1) 
        }

        
        function handleChangeMask(event : any) {
          const { value } = event.target
      
          setValor(mask(value))
      }


      function confirmaEmail(){

        SetValidaEmailModal(true);
      }
  
        async function handlePontuar(cpf : string) {

      
          if(cpfstado.length == 0){
        
            toast.error("É necessário informar um CPF");
          }
          
      
        }

        async function  handleCPF(data :cpfProps){

          const cpfValido = cpf.isValid(data.cpf)

          if(cpfValido == false){
            toast.error("CPF Inválido")
            return
          }

          let cpfTratado = data.cpf.replace('.', '').replace('-','')
          cpfTratado = cpfTratado.replace('.','')
        
          const dados = await api.get(`/usuario/${cpfTratado}`)
          Setcpfstado(data.cpf)
          SetbotaPontual(true)
          SetNomeCpf(dados.data.resultado[0].nome)
          SetValidaEmail(dados.data.validaemail)
          SetcpfComponente(cpfTratado)

          if(dados.status == 400){
      
            return
          } 
        

        }

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }, 

    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)
    
  });


  async function handleUpdateEmail(){

  }



  return (
    <>
  <ToastContainer></ToastContainer>
    <form onSubmit={handleSubmit(handleCPF)} ref={formRef}>

      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Campanhas Ativas</h2>
          <div className='mt-5'> 


          {idEmpresa ? (<ResumoCampanha key={key} id_empresa_resumo={idEmpresa}></ResumoCampanha>) : (<div></div>)}
        
          </div>
          
          <div className="mt-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            
          <div className="sm:grid sm:grid-cols-1 sm:items-start sm:gap-4 sm:py-6 items-center">
          
          {botaPontual ? (
              <Card className={`${validaEmail ? `items-center` : `items-center `} `}>
              <CardHeader className="">
                <CardTitle className={`${validaEmail ? `text-3xl  text-red-700` : `text-3xl`} `}>{nomeCPF}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardFooter>
              { validaEmail  ? (
                
                <DialogEmail CPF={cpfComponente}></DialogEmail>
                ) : (<span></span>)}
              </CardFooter>
            </Card>) : (<span></span>)}
        
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                CPF Cliente : 
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                maxLength={14}
                value={valor}
                 {...register('cpf')}
                  type="text"
                  onChange={handleChangeMask}
                  id="cpf"
                  autoComplete="given-name" 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-2"
                />
                <div className="flex justify-end items-center mt-3">
                </div>
                  <div className="items-center grid gap-3">
                  <div className={`${botaPontual ? 'visible bg-red-500 sm:max-w-xs sm:text-sm sm:leading-6 px-2  w-full rounded-md h-10 flex items-center justify-center gap-4': 'hidden'}`}>
                    <PontuacaoModal CPF={cpfstado} formularioclear={handleClearForm}></PontuacaoModal> <Gift className="text-white" size={18}/>
                  </div>
                    <button type="submit" className={`text-white  justify-between bg-green-600 sm:max-w-xs sm:text-sm sm:leading-6 px-2 block w-full rounded-md h-10 ${botaPontual ? 'mt-0' : 'mt-5'}`}>{botaPontual ? (<span className="flex justify-center gap-2"> Nova Busca <SearchCheck></SearchCheck></span>): (<span> Buscar </span>)} </button>
                    </div>
                 </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
      </div>
    </form>


   
    </>
  )
}


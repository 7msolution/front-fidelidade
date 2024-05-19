'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, parse } from "date-fns"
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {  toast, ToastContainer } from 'react-toastify';
import { ArrowBigRight, Gem, Gift } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/api/api'
import { get_server_session } from '@/action/get-session-server'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'



const criarCamapanhaSchema = z.object({
    nome_campanha: z.string(),
    descricao: z.string(),
    qtde_servico: z.number(),
    qtde_token:  z.number().optional() 

})

type CriarCamapanhaSchema = z.infer<typeof criarCamapanhaSchema>

export default  function FormCampanha() {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<CriarCamapanhaSchema>({
       
        resolver: zodResolver(criarCamapanhaSchema),
  
    })

    const [date, setDate] = React.useState<Date>()

    const [datefim, setDatefim] = React.useState<Date>()
    const [radioToken, SetRadioToken] =  React.useState(0)

    const route = useRouter()


    async  function handleStatus( tokenAtivo : number) {
      console.log(errors)

      if(tokenAtivo == 1){
        SetRadioToken(1)
        
      }else if(tokenAtivo == 2)

      SetRadioToken(0)
      
    }

    async function handleCadastrado(data : CriarCamapanhaSchema){

      alert(radioToken)
         
        const data_inicio = date!
        const data_fim  =  datefim!
        
        const session = await   get_server_session()
        const id_empresa = session?.session.user.empresaId
        const id_user = session?.session.user.user
 
        console.log(data)


        
        const insere = await api.post("/campanha", {
            nome_campanha: data.nome_campanha,
            qtde_servico : data.qtde_servico,
            descricao : data.descricao,
            id_empresa : id_empresa,
            data_inicio: data_inicio,
            data_fim : data_fim,
            id_user : id_user,
            gera_token : radioToken,
            qtde_token: data.qtde_token
        })

        if(insere.data.status == true){
       
          toast.success(insere.data.mensagem ,{
            onClick: ()=>{codingCourse}
          })
          setTimeout(codingCourse, 3000);
        }else{
            toast.error("Erro ao inserir Campanha")
        

        }

        reset()

    

    }

  


//function definition

function codingCourse() {
  route.push("/dashboard/campanha")
}

  return (
    <>
   <ToastContainer/>
    <form onSubmit={handleSubmit(handleCadastrado)}>
      <div className="space-y-12 sm:space-y-16">
        <div>
     
          <h2 className="text-base font-semibold leading-7 text-gray-900">Campanha</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Espaço endereçado para realizar o cadastro de campanha
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="nomeCampanha" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Nome Campanha
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="text"className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" {...register("nome_campanha")}
           
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="Quantidade Bonus" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Quantidade Bonus
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input type="number" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" {...register("qtde_servico", { valueAsNumber: true })}/>
                </div>
              </div>
            </div>

            
``
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Descrição Campanha
                {console.log(errors)}
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="about"
                  {...register("descricao")}
                  rows={3}
                  
                  className=" pl-1 block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Gera Token
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <RadioGroup >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" onClick={()=> handleStatus(1)}/><Label htmlFor="yes">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" onClick={()=>handleStatus(2)} checked={!radioToken}/><Label htmlFor="no">Não</Label>
                    </div>
                  </RadioGroup>
                
              </div>
            </div>

          {radioToken ? (<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="Quantidade Bonus" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Quantidade de Token
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input type="number" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" {...register("qtde_token", { valueAsNumber: true })}/>
                </div>
              </div>
            </div>) : (<span></span>)}
      
            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Data Vigencia
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex items-center gap-x-3">
               

                        <Popover>
                        <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Data Inicial</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                       
                        />
                        </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground" )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {datefim ? format(datefim, "PPP") : <span>Data Final</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={datefim}  onSelect={setDatefim} initialFocus  
                            />
                            </PopoverContent>
                        </Popover>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 py-10">
             <Button className='text-center px-10 bg-blue-600' type="submit">Salvar</Button>
             <Button className='text-center px-10 bg-red-600'>Cancelar</Button>
            </div>
          </div>
        </div>
        </div>
    </form>
    </>
  )
}


'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons"
import { Calendar } from '@/components/ui/calendar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns/format"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/api/api"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"



type func = () => void;


interface CampanhProps {

    campanha:{
        id_campanha : number
        nome_campanha: string
        data_inicio: Date
        data_fim: Date
        descricao: string
        qtde_servico : number
       
        
    },
    func : func
    

}

const editarCampanha = z.object({
    nome_campanha: z.string(),
    descricao: z.string(),
    qtde_servico: z.string(),

})
type EditarCampanha = z.infer<typeof editarCampanha>


export default function DialogEditCampanha({campanha, func} : CampanhProps){

    let _campanha = campanha

    console.log("edit >>>> ")
    console.log(_campanha)

    const [date, setDate] = React.useState<Date>()
    const [datefim, setDatefim] = React.useState<Date>()

    const route = useRouter()
    const [open, setOpen] = useState(false);

    const {register, handleSubmit, reset,} = useForm<EditarCampanha>({
          
      defaultValues:{
          descricao: _campanha.descricao,
          nome_campanha : _campanha.nome_campanha,
          qtde_servico : _campanha.qtde_servico.toString()
          
      },
      resolver : zodResolver(editarCampanha)
  })
 

   async function handleDataState() {

    const data_inicio =  _campanha.data_inicio
    const data_fim =  _campanha.data_fim
    setDate(new Date(data_inicio))
    setDatefim(new Date(data_fim))
  
    
   }


   
      async function handleSubForm(data : any){

        reset()
        const resultado = await api.put("/campanha", {
            id_campanha :  _campanha.id_campanha, 
            nome_campanha: data.nome_campanha,
            qtde_servico : Number(data.qtde_servico) ,
            descricao : data.descricao,
            data_inicio: date,
            data_fim : datefim,
       
        })

   
        if(resultado.data.status == true){
          reset()
          setOpen(false)
          func()
         toast.success("Sucesso!")
        
        
        }else{
          toast.error("Não foi possivel atualizar a campanha")
        }
      }






    return(
<>
    
        <Dialog open={open} onOpenChange={setOpen} >
    
      <DialogTrigger asChild >
        <Button onClick={handleDataState} className=" bg-gray-300"><Edit size={15} className="cursor-pointer" ></Edit></Button>
      </DialogTrigger>

      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>

      <form onSubmit={handleSubmit(handleSubForm)}>
        <DialogHeader>
          <DialogTitle className="flex gap-3">Editar Campanha <CalendarIcon></CalendarIcon></DialogTitle>
          <DialogDescription>
            Para realizar a alteração basta salvas as mudanças desejadas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Campanha
            </Label>
            <Input
            
            {...register("nome_campanha")}  
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Quantide Serviço
            </Label>
            <Input
            type="number"
            {...register("qtde_servico")}  
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Descrição
            </Label>
            <Textarea
             {...register("descricao")}  
              
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
            Data
            </Label>
          <Popover>
                        <PopoverTrigger asChild>
                        <Button
                        name = "data_inicio"
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
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
                        <div className=" items-start">

                        <Popover>
                            <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground" )}>
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
        <DialogFooter>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">Save changes</Button>
        </DialogFooter>    
        </form>

      </DialogContent>
  
    </Dialog>
    </>

    )
}
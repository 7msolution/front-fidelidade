import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api/api";
import { cp } from "fs";
import { toast, ToastContainer } from "react-toastify";

const validacaoEmailSchema = z.object({

  email: z.string().max(200),
  celular: z.string().max(20),

});

type ValidacaoEmailSchemaType = z.infer<typeof validacaoEmailSchema>;


export default function DialogEmail(CPF : any)
{

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
    

  } = useForm<ValidacaoEmailSchemaType>({ resolver: zodResolver(validacaoEmailSchema)});

  async function handleAtualizaEmail(data : any){

    console.log(CPF.CPF)
    console.log(data.email)
    console.log(data.celular)

    
    try{

      const resultado = await api.put(`/usuarioatualiza/${CPF.CPF}`, {
     
        email : data.email,
        celular : data.celular 
    })

    toast.success("Email cadastrado com sucesso!")

    }catch(error){

      

    }
   

  }


  return(
<Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button className='bg-red-700 hover:bg-red-400 border-spacing-0'>Terminar Cadastro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit(handleAtualizaEmail)}>
        <DialogHeader>
          <DialogTitle>Fale conosco</DialogTitle>
          <DialogDescription>Preencha o formulário abaixo para entrar em contato.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              Email
            </Label>
            <Input className="col-span-3" id="email" placeholder="seu@email.com" type="email" {...register("email")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="phone">
              Celular
            </Label>
            <Input className="col-span-3" id="phone" placeholder="(00) 00000-0000" type="tel" {...register("celular")} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-400">Enviar</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  
  )
}


"use client"

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import z, { any } from "zod"
import api from '@/api/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const NewUserSchmema = z.object({
    nome: z.string().max(20),
    sobrenome : z.string().max(500),
    empresa : z.string().max(100),
    email : z.string().max(300),
    cidade : z.string().max(150),
    endereco : z.string().max(10),
    estado : z.string().max(10),
    cep : z.string().max(10)
  });

  interface UserEmpresaProps{
    nome: string
    sobrenome : string,
    empresa : string,
    email : string,
    cidade : string,
    endereco : string,
    estado :string,
    cep : string
  }


  type NewUserSchmemaType = z.infer<typeof NewUserSchmema>;

export default function New() {

    const route = useRouter()
  
  const { register, handleSubmit} = useForm<NewUserSchmemaType>({resolver: zodResolver(NewUserSchmema)})


  async function handleClick(){
    route.push("/signin"); 
  }

   async  function EnviaForm(data: NewUserSchmemaType) {

    const resultado = await api.post("/userempresa",{
        nome : data.nome, 
        sobrenome : data.sobrenome, 
        empresa : data.empresa, 
        email: data.email, 
        cidade: data.cidade, 
        endereco :data.cidade, 
        estado : data.estado,
        cep : data.cep
    })



    console.log()

    if(resultado.status == 200){
        toast.success(resultado.data.resposta, {
            onClick: handleClick
        });
      

        setTimeout(() => {
            route.push("/signin"); // Change '/redirect-page' to the desired URL
          }, 5000); 
        
    }else{
        toast.error(resultado.data.resposta);
    }
    
    
  
  }


  return (
    <>
    <ToastContainer></ToastContainer>
    <div className="h-36 bg-gray-900/80">
        
    </div>
    <div className="space-y-10 divide-y divide-gray-900/10 px-10" >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
 

 
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Cadastro para utilização de credito</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Preencha todas as informações para que nosso time entre em contato e libere a plataforma de bonus <br></br>
          <br></br>
         
          <b>O password será gerado aumático e será enviado para o e-mail cadastrado</b></p>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit(EnviaForm)}>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                 Nome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("nome")}
                    id="nome"
                    autoComplete="given-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Sobrenome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("sobrenome")}
                    id="last-sobrenome"
                    autoComplete="family-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className=" px-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

    

              <div className="col-span-full">
                <label htmlFor="Empresa" className="block text-sm font-medium leading-6 text-gray-900">
                Empresa
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("empresa")}
                    
                    autoComplete="Empresa"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="Empresa" className="block text-sm font-medium leading-6 text-gray-900">
                Endereço
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("endereco")}
                    
                    autoComplete="Endereço"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Cidade
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("cidade")}
                    id="Cidade"
                    autoComplete="address-level2"
                    className="px-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  Estado
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("estado")}
                    id=""
                    autoComplete="Estado"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  CEP
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("cep")}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

   
    </div>
    </>

  )
}

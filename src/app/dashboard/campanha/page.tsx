'use client'

import { get_server_session } from "@/action/get-session-server"
import api from "@/api/api"
import MenuGeral from "@/app/components/menu-geral"
import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import DialogEditCampanha from "./components/dialog-edit"
import { ptBR } from "date-fns/locale"

interface campanhaProps{
    data: {
        resultado : [{
            id_campanha: number,
            id_empresa: number,
            nome_campanha: string,
            data_inicio: Date,
            data_fim: Date,
            ativo: number,
            qtde_servico: number,
            descricao: string | null,
            id_user: number | null
        
        }

        ]
    }
  
}

interface EmpresaIdProps{
    session:{
        user:{
            empresaId: number | null 
        }
    }
}

  export default  function Campanha() {

    const [resultado, SetResultado] = useState<campanhaProps>()
    const [testeRef, SettesteRef] = useState(0)



    const updateName = async () => {

      const session = await get_server_session()
      const id_empresa  = session?.session.user.empresaId
      const buscaapi : campanhaProps =  await api.get(`/campanha?id_empresa=${id_empresa}`)
      SetResultado(buscaapi)

    }


        useEffect(()=>{       

          async function handleOpen() {

          const session = await get_server_session()
          const id_empresa  = session?.session.user.empresaId
          const buscaapi : campanhaProps =  await api.get(`/campanha?id_empresa=${id_empresa}`)
          SetResultado (buscaapi)
    
        }

        handleOpen()
        },    
      [])

    return (
  
        <MenuGeral>
        <ToastContainer></ToastContainer>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Campanhas cadastradas</h1>
            <p className="mt-2 text-sm text-gray-700">
              
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
           <Link href="/dashboard/campanha/new-campanha" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar Campanha</Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Nome Campanha
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Data Inicio
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Data Fim
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">Qtde Campanha</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">Editar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {resultado?.data.resultado.map((person : any) => (
                    <tr key={person.id_campanha}>
                   
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.nome_campanha}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(person.data_inicio, "dd/MM/yyyy")}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(person.data_fim, "dd/MM/yyyy")}</td>
                      <td className="text-sm text-gray-500 text-center">{person.qtde_servico}</td>
                      <td className="text-sm text-gray-500 text-center  mt-2"><DialogEditCampanha campanha={person} func={updateName}></DialogEditCampanha></td>
                    </tr>
                     ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
    
      </MenuGeral>
    )
  }
  
"use client"


import { get_server_session } from "@/action/get-session-server"
import api from "@/api/api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import ResgateDialog from "./resgate-dialog"

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]

  interface ResgateProps{
    id_empresa: number,
    id_campanha: number,
    nome_campanha: string,
    qtde_carimbo: number,
    qtde_servico: number,
    id: number,
    name: string,
    resgate: string
  }

export default function TableResgate(){



        const [resultado, SetResultado] = useState<ResgateProps[]>([])

        useEffect(()=>{
            async function handleresultado() {

                const result : ResgateProps[]  = await api.get(`/resgate/${2024}`)
    
                SetResultado(result.data.resultado) 
            }

            handleresultado()
        }
      

        , [])

      
       
      




    return(
        <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                  Cliente
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Campanha
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Pontos Campanha
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                  Pontos Cliente
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Resgatar
                 
                </th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((person, index) => (
                <tr key={index}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {person.name}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.nome_campanha}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell text-center">{person.qtde_servico}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center">{person.qtde_carimbo}</td>
                  <td className="relative py-4 pl-3 text-center text-sm font-medium">
                    <ResgateDialog resgate={person}></ResgateDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}
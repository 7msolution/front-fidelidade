import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { cliente } from "@/action/api";
import { Search } from "lucide-react";


interface SessionProps{
  data:{
        resultado:{
            email: string, 
            empresaId: number,
            id_user: number,
            role: number
        }
  }| null

}


export async function ClienteTabelaLinha() {

  const session = await getServerSession(nextAuthOptions)
  
  //busca os clientes
  const retorno = await cliente(session?.session.user.empresaId)

return (

  <>
    <table className="min-w-full divide-y divide-gray-300">
    <thead>
      <tr>
        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
          Nome
        </th>
        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
          Campanha
        </th>
        <th scope="col" className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell">
          Qtde Cupom
        </th>
        <th scope="col" className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell">
         Visualizar
        </th>
      </tr>
    </thead>
  
      <tbody className="divide-y divide-gray-200 bg-white">
    {retorno.map((reposta, index)=>(
      <tr  key={index}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{reposta.usuario_campanha}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reposta.nome_campanha}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{reposta.qtde_carimbo}</td>
        <td className=" items-center justify-center mt-5 flex">  <Search className=" items-center cursor-pointer" size={14}/></td>
    
      </tr> 
    ))}
  
  </tbody>
  
  </table>
  </>

  )
}
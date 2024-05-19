
import { get_server_session } from "@/action/get-session-server";
import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Input from "postcss/lib/input";
import { useEffect } from "react";



export  async function SelectCampanha() {



  async function handleCampanha() {

    const session = await get_server_session()

    const empresaId = session?.session.user.empresaId

    const campanhaValor = await api.get(`/campanha/?id_empresa=${empresaId}`)

    return  campanhaValor
  }

  let campanha : any = await handleCampanha()
  campanha  = campanha.data.resultado 

    return(

        <form>

          <div className="gap-3 flex  w-full">
        <div className="py-1 font-bold text-sm">Campanha:</div>
        <div className="text-sm items-center flex gap-5">


            <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="0" >Nenhum item</SelectItem>
          {campanha.map((campanha : any, index : number )=>(
                      
                            
              <SelectItem  key={campanha.id_campanha} value={campanha.id_campanha+""}>{campanha.nome_campanha }</SelectItem>
              
                    
          ))}
            </SelectContent>
          </Select>

        </div>
        
        <div className="py-1 font-bold  pl-10 text-sm">  Nome Cliente : </div>
        <div><input type="text" className="block px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </input>
          </div>

        <div  className="flex px-10"><Button type="submit">Filtrar</Button></div>


        </div>
        
       
   
        </form>
    )
    
}
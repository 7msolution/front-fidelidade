
import api from "@/api/api";
import MenuGeral from "../../components/menu-geral"
import {ClienteTabelaLinha}  from "./components";

import {SelectCampanha} from "./components/select-campanha";

  
  export default async function Clients() {



    return (


  <MenuGeral>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Clientes</h1>
            <p className="mt-2 text-sm text-gray-700">
              Listagem de clientes dentro do mês que entraram na campanha
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
       
          </div>
        </div>
   
        <div className="-mx-4 mt-8 sm:-mx-0 w-100%">
          <div className="flex grid-cols-2 space-x-3">
            
       
               <SelectCampanha>
                
               </SelectCampanha>
          </div>
       
        <div className="mt-10">
          <ClienteTabelaLinha />
        </div>
        </div>
      </div>
      </MenuGeral>
    )
  }
  
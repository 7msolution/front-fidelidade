import MenuGeral from "@/app/components/menu-geral";
import { DataFilter, } from "./components/data-filter";



export default function Resgate(){

    return(
        <MenuGeral>
            <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Resgate</h1>
            <p className="mt-2 text-sm text-gray-700">
              Lista de clientes que estão aptos para resgate
            </p>
          </div>
    
        </div>
      </div>

        <DataFilter></DataFilter>
  
    </div>
        </MenuGeral>
    )
}
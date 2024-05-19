"use client"

import api from "@/api/api"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { any } from "zod"
import { getSessionData } from "../libs/getSession"
import ResumoCards from "./components/resumo-cards"

interface ResumoCampanhaProps{
    data:[{
        id_empresa : number
        Qtde_Carimbo: number
        nome_campanha: string
    }]  
}

interface EmpresaidProops{
    id_empresa_resumo : number
}

export default function ResumoCampanha({id_empresa_resumo} : EmpresaidProops){

    const [resumoCampanha, SetresumoCampanha] = useState<ResumoCampanhaProps[]>([])

    const [valorCard, setValorCard] = useState(1)
    
    const [campanha, SetCampanha] = useState(false)
    
    const [qtdeCampanha, SetqtdeCampanha] = useState(false)

    useEffect(()  =>{
         api.get("/resumocampanha", {
            params:{
                id_empresa: id_empresa_resumo
            }
         }).then(resposta =>(setValorCard(4)))



        async function buscaResumo() { 

          const resumo : ResumoCampanhaProps[] = await api.get("/resumocampanha", {
            params:{
                id_empresa: id_empresa_resumo
            }
         })

         if(resumo == undefined){
            SetresumoCampanha([])
         }else{
            SetresumoCampanha(resumo.data.resultado)
         }
         
           
        

    }

    buscaResumo()}, [])

    return(

        
        <div className="grid grid-flow-col auto-cols-max gap-2">{resumoCampanha.map((resumo, index) => <div  key={index} className=" w-96"><ResumoCards   cards={resumo} key={index}></ResumoCards></div>)}</div>
        
     
    
        )
}
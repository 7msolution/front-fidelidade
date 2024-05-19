import api from "@/api/api"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"

import { getServerSession, Session } from "next-auth"

interface CampanhaInsertProps{

    nome_campanha: string, 
    data_inicio: Date, 
    data_fim: Date, 
    qtde_servico: number, 
    descricao : string 

}

export const insereCampanha = async ({nome_campanha, descricao, qtde_servico, data_inicio, data_fim }: CampanhaInsertProps) =>

        {
            const session = await getServerSession(nextAuthOptions)
            console.log(session)

            console.log(nome_campanha)
            console.log(data_inicio)

            /*
            const insert = api.post("/campanha", {
                nome_campanha : nome_campanha,
                data_inicio : data_inicio,
                data_fim : data_fim,
                qtde_servico : qtde_servico, 
                id_empresa : 22, 
                descricao : descricao
                
            })
            */
        }
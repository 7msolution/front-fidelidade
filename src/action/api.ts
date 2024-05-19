import api from "@/api/api"
interface UsuariCampanhaProps{
    resultado:[{
                     usuario_campanha: string,
                     nome_campanha : string,
                     qtde_carimbo : number,
                     id_empresa : number

                 }]
}
export const cliente = async (id_empresa : any) => {
    const camapanhaCliente = await api.get<UsuariCampanhaProps>(`/carimbo/${id_empresa}`)
    return camapanhaCliente.data.resultado
    
  }
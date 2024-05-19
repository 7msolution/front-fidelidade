import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Gem } from 'lucide-react';

  interface ResumoCampanhaProps{

    id_empresa : number
    Qtde_Carimbo: number
    nome_campanha: string

}

  export default function ResumoCards({cards}: ResumoCampanhaProps){
    return(
        <Card className="mt-0">
        <CardHeader className="">
          <CardTitle className="text-3xl"><div className="flex justify-between"><div>{cards.Qtde_Carimbo }</div><div className=""><Gem></Gem></div></div></CardTitle>
          <CardDescription>{cards.nome_campanha}</CardDescription>
        </CardHeader>
      </Card>
    )
  }


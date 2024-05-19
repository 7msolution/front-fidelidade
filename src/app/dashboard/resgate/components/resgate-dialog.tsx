import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gem, ToyBrick } from "lucide-react"



export default function ResgateDialog(resgate : any){

    console.log(resgate)

    async function handleResgate() {

        alert(resgate.resgate.qtde_carimbo)
        
    }

    return(
        <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline">Resgatar</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-lg flex items-center justify-center mt-5 pb-5 "><Gem size={60} color="#4ADE80"/></DialogTitle>
                                <DialogDescription className="text-lg">
                                     Você deseja resgatar os pontos <b>{resgate.resgate.name}</b>
                                </DialogDescription>
                            </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center">
                        
                        </div>
                        <div className="flex items-center justify-center text-lg"><span>Pontos a serem resgatados:{' '} <b>{resgate.resgate.qtde_carimbo}</b></span></div>
                        </div>
                        <DialogFooter>
                        <Button type="submit" className=" bg-blue-500" onClick={()=>handleResgate()}>Resgatar</Button>
                        <Button  className=" bg-red-500">Cancelar</Button>
                        </DialogFooter>
                        </DialogContent>
                    </Dialog>

    )
}
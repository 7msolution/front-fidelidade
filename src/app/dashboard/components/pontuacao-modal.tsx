
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState ,  Fragment, useRef } from 'react'
import { useForm } from 'react-hook-form'
import api from '@/api/api'
import { Gem } from 'lucide-react';


import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify'
import { getSessionData } from '@/app/libs/getSession'
import { get_server_session } from '@/action/get-session-server';


interface CamapanhaProps{

  id_campanha : number
  id_empresa : number 
  nome_campanha : string
  data_inicio : Date
  data_fim : Date 
  ativo : number
  qtde_servico :number

}



export default function PontuacaoModal( {CPF, formularioclear}  : any){
  const router = useRouter();


  const { register, handleSubmit, reset } = useForm();

  const [open, setOpen] = useState(false)
  const [selectCampanha, SetselectCampanha] = useState<CamapanhaProps[]>([])
  const cancelButtonRef = useRef(null)

  async function LimpaForm(){
    reset()
    formularioclear();

  }

   async  function handleFunciton (data : any) {

    if(open !== false){


      const id_user_log = await get_server_session()

  
      const carimbou = await api.post("/carimbo", {
          id_user_carimbou : id_user_log?.session.user.id_user, 
          cpf : CPF.replace(".", "").replace(".", "").replace("-", ""), 
          id_campanha : Number(data.id_campanha),
          
      })
    
      setOpen(false)
      LimpaForm()
      toast.success("Campanha adicionada com sucesso")

    }
  }

      async function atualizaModal (){
      
        setOpen(true)
       
      }


      useEffect(()=>{

        async function handleCampanhaList(){
          const sessionData =  await getSessionData();
          
  
          api.get(`/campanha?id_empresa=${sessionData?.session.user.empresaId}`).then((resposta ) =>{SetselectCampanha(resposta.data.resultado)})
     
        }

        handleCampanhaList()
    
          }, [])

    return(
        <>
        <button type='button' onClick={()=>{atualizaModal()}} className="text-white">Pontuação</button>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <form  onSubmit = {handleSubmit(handleFunciton)}>
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Gem className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Pontos para o CPF  : { CPF }
                      </Dialog.Title>
                      <div className="mt-2">
                       
                           <select className='text-sm h-10' {...register('id_campanha')}>
                            <option value={0} className="text-gray-400">Selecione a Campanha</option>
                           { selectCampanha.map( (number, index) => <option className=' text-center text-sm' key={number.id_campanha} value={number.id_campanha}>{ number.nome_campanha }</option>) }
                           </select>

                     
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      //onClick={() => setOpen(false)}
                    >
                      Pontuar
                    </button>
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                       onClick={() => setOpen(false)}
                      
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </>
    )

}
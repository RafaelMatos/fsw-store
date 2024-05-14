import { Button } from '@/components/ui/button'
import ProductListLoading from '@/components/ui/product-list-loading'
import SectionTitle from '@/components/ui/section-title'
import { ArrowLeft, ArrowRight, TruckIcon } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex flex-col gap-8  pb-8">
      <div className="mt-5 flex flex-col gap-8 lg:mx-5  lg:grid lg:grid-cols-2">
        {/* ProductImages */}
        <div className="flex flex-col">
          <div className="flex h-[380px] w-full animate-pulse items-center justify-center  rounded-lg bg-accent"></div>
          <div className="mt-8 grid grid-cols-4 gap-4 ">
            {Array.from({ length: 4 }).map((item, index) => {
              return (
                <button
                  key={index}
                  className="flex h-[100px] animate-pulse items-center justify-center rounded-lg bg-accent"
                  disabled
                />
              )
            })}
          </div>
        </div>
        {/* ProductImages */}
        <div className="flex flex-col px-5 lg:px-0 ">
          <div className=" flex flex-col gap-2">
            {Array.from({ length: 3 }).map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex h-4 w-40 animate-pulse items-center justify-center  rounded-lg bg-accent"
                />
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button size="icon" variant="outline" disabled>
              <ArrowLeft size={16} />
            </Button>
            <span></span>
            <Button size="icon" variant="outline" disabled>
              <ArrowRight size={16} />
            </Button>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <h3 className="font-bold">Descrição</h3>
            <div className=" flex flex-col gap-1">
              {Array.from({ length: 5 }).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-3 w-full animate-pulse items-center justify-center  rounded-lg bg-accent"
                  />
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-5 xl:flex-row">
            <Button
              className=" w-full animate-pulse font-bold uppercase"
              disabled
            >
              Adicionar ao carrinho
            </Button>

            <div className="  flex w-full items-center justify-between rounded-lg bg-accent px-5 py-2">
              <div className="flex items-center gap-2">
                <TruckIcon />
                <div className="flex flex-col gap-1">
                  <p className="text-xs">
                    Entrega via{' '}
                    <span className="font-bold italic">FSPacket®</span>
                  </p>
                  <p className="text-xs text-[#8162FF]">
                    Envio para <span className="font-bold">todo Brasil</span>
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold">Frete grátis</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col">
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductListLoading />
      </div>
    </div>
  )
}

export default Loading

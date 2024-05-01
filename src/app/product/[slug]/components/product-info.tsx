'use client'
import { Button } from '@/components/ui/button'
import DiscountBadge from '@/components/ui/discount-badge'
import { ProductWithTotalPrice } from '@/helpers/product'
import { ArrowLeft, ArrowRight, TruckIcon } from 'lucide-react'
import { useState } from 'react'

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    'basePrice' | 'description' | 'discountPercentage' | 'totalPrice' | 'name'
  >
}
const ProductInfo = ({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(0)

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 0 ? prev : prev - 1))
  }
  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 10 ? prev : prev + 1))
  }
  return (
    <div className="flex flex-col px-5 lg:px-0 ">
      <h2 className="text-lg">{name}</h2>
      <div className="item-center flex flex-col">
        <div className="flex gap-2">
          <h1 className="text-lg font-bold">R$ {totalPrice.toFixed(2)}</h1>
          {discountPercentage > 0 && (
            <DiscountBadge>{discountPercentage}</DiscountBadge>
          )}
        </div>

        {discountPercentage > 0 && (
          <p className="text-sm line-through opacity-75">
            R$ {Number(basePrice).toFixed(2)}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={quantity === 0}
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeft size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          disabled={quantity === 10}
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRight size={16} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <div className="mt-8 flex w-full flex-col items-center gap-5 xl:flex-row">
        <Button className=" w-full font-bold uppercase">
          Adicionar ao carrinho
        </Button>

        <div className="  flex w-full items-center justify-between rounded-lg bg-accent px-5 py-2">
          <div className="flex items-center gap-2">
            <TruckIcon />
            <div className="flex flex-col gap-1">
              <p className="text-xs">
                Entrega via <span className="font-bold italic">FSPacket®</span>
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
  )
}

export default ProductInfo

import { computeProductTotalPrice } from '@/helpers/product'
import { Prisma } from '@prisma/client'
import Image from 'next/image'

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex w-full flex-col  gap-2">
        <div className="flex w-fit rounded-md bg-accent px-2">
          <p className="text-[10px]">
            Vendido e entregue por <span className="font-bold">FSW Store</span>
          </p>
        </div>
        <p>{orderProduct.product.name}</p>
        <div className="item-center flex w-full justify-between gap-2">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R${productWithTotalPrice.totalPrice.toFixed(2)}
            </p>
            {orderProduct.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R${Number(productWithTotalPrice.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-xs opacity-75">Qntd:{orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderProductItem

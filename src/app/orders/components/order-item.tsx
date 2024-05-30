import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Prisma } from '@prisma/client'
import { addDays, format } from 'date-fns'
import OrderProductItem from './order-product-item'
import { Separator } from '@/components/ui/separator'
import PriceItem from './price-item'
import { useMemo } from 'react'
import { computeProductTotalPrice } from '@/helpers/product'
import { Badge } from '@/components/ui/badge'
import { getOrderStatus } from '../helpers/status'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      )
    }, 0)
  }, [order.orderProducts])

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productTotalPrice = computeProductTotalPrice(product.product)
      return acc + productTotalPrice.totalPrice * product.quantity
    }, 0)
  }, [order.orderProducts])

  const totalDiscounts = subtotal - total
  const orderNumber = String(order.number).padStart(3, '0')
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full " collapsible>
        <AccordionItem value={order.id} className=" border-b-0">
          <AccordionTrigger>
            <div className=" flex w-full flex-col  items-center gap-1 pr-2 text-left sm:flex-row sm:justify-between">
              {/* <div className="flex h-[60px]  w-[70px] items-center  justify-center rounded-lg bg-accent">
                <Image
                  src={order.orderProducts[0].product.imageUrls[0]}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
                  alt={order.orderProducts[0].product.name}
                />
              </div> */}
              <div className="flex flex-col gap-1">
                <p>Pedido #{orderNumber}</p>
                <p className="text-xs opacity-60">
                  {order.orderProducts.length}{' '}
                  {order.orderProducts.length > 1 ? 'produtos' : 'produto'}
                </p>
              </div>
              <span className="text-sm opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <Separator />
            <div className="flex flex-col ">
              <div className="flex flex-wrap items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>
                <div className="">
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
                <div className="">
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="">
                  <p className="font-bold">Previsão de entrega</p>
                  <p className="opacity-60">
                    {order.status === 'PAYMENT_CONFIRMED'
                      ? format(addDays(order.createdAt, 10), 'dd/MM/yyyy')
                      : '--/--/----'}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <Badge
              className="w-fit gap-1 border border-primary px-3 py-[0.375rem] text-base"
              variant="outline"
            >
              Produtos
            </Badge>
            {order.orderProducts.map((orderProduct) => {
              return (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              )
            })}
            <div className="flex w-full flex-col gap-1">
              <PriceItem title="Subtotal" value={subtotal} />
              <PriceItem title="Entrega" />
              <PriceItem title="Descontos" value={totalDiscounts} discount />
              <PriceItem total title="Total" value={total} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem

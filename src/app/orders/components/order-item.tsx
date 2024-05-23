import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import OrderProductItem from './order-product-item'
import { Separator } from '@/components/ui/separator'

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
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full " collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length}{' '}
              {order.orderProducts.length > 1 ? 'produtos' : 'produto'}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex flex-col ">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162FF]">{order.status}</p>
                </div>
                <div className="">
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="">
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {order.orderProducts.map((orderProduct) => {
                return (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem

'use server'

import { Badge } from '@/components/ui/badge'
import { auth } from '../../../../auth'
import { PackageSearchIcon } from 'lucide-react'
import { prismaClient } from '@/lib/prisma'
import OrderItem from './components/order-item'

const OrderPage = async () => {
  const session = await auth()
  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-lg">Acesso negado!</p>
        <p className="text-sm opacity-75">Faça login para ver seus pedidos</p>
      </div>
    )
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>
      <div className=" flex flex-col gap-5">
        {orders.map((order) => {
          return <OrderItem key={order.id} order={order} />
        })}
      </div>
    </div>
  )
}

export default OrderPage

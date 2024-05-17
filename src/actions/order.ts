'use server'
import { prismaClient } from '@/lib/prisma'
import { CartProduct } from '@/providers/cart'
import { auth } from '../../auth'

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  const authUser = await auth()
  console.log('authUser:', authUser)
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: 'WAITING_FOR_PAYMENT',
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            productId: product.id,
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            quantity: product.quantity,
          })),
        },
      },
    },
  })

  return order
}

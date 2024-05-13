'use server'
import Stripe from 'stripe'

import { CartProduct } from '@/providers/cart'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createCheckout = async (products: CartProduct[]) => {
  // Criar checkout
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  })

  // retornar o checkout
  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: process.env.HOST_URL,
    cancel_url: process.env.HOST_URL,
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice * 100,
        },
        quantity: product.quantity,
      }
    }),
  })
  return checkout
}

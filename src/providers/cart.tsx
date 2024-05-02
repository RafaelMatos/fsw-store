'use client'
import { Product } from '@prisma/client'
import { ReactNode, createContext } from 'react'

interface CardProduct extends Product {
  quantity: number
}

interface ICardContext {
  products: CardProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}

const CartContext = createContext<ICardContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
})

export const CardProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

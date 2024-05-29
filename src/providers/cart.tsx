'use client'
import { ProductWithTotalPrice } from '@/helpers/product'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICardContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  total: number
  subTotal: number
  totalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  removeAllProductsFromCart: () => void
}

export const CartContext = createContext<ICardContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  removeAllProductsFromCart: () => {},
})

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  useEffect(() => {
    const localProducts = localStorage.getItem('@fsw-store/cart-products')
    if (localProducts) {
      setProducts(JSON.parse(localProducts))
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('@fsw-store/cart-products', JSON.stringify(products))
    }, 0)
  }, [products])
  // Total sem descontos
  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  // Total com descontos
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity
    }, 0)
  }, [products])

  // Total de descontos
  const totalDiscount = subTotal - total

  const addProductToCart = (product: CartProduct) => {
    // Se o produto já estiver no carrinho, apenas a aumente a sua quantidade
    const productAlreadyOnCard = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )
    if (productAlreadyOnCard) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }
          return cartProduct
        }),
      )
      return
    }
    // se não, adicione o produto à lista
    setProducts((prev) => [...prev, product])
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            }
          }
          return cartProduct
        })
        // Remove do carrinho os produtos zerados
        .filter((cartProduct) => cartProduct.quantity > 0),
    )
  }
  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          }
        }
        return cartProduct
      }),
    )
  }
  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    )
  }
  const removeAllProductsFromCart = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        total,
        subTotal,
        totalDiscount,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        removeAllProductsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

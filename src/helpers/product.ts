import { Product } from '@prisma/client'
export interface ProductWithTotalPrice extends Product {
  totalPrice: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const computeProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    }
  }
  const totalPrice =
    Number(product.basePrice) * (product.discountPercentage / 100)

  return {
    ...product,
    totalPrice,
  }
}

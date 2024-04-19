import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'

interface ProductDetailsPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  })
  if (!product) return null
  return <ProductItem product={computeProductTotalPrice(product)} />
}

export default ProductDetailsPage

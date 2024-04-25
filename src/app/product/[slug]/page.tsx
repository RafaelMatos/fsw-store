import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'
import ProductInfo from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'

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
  return (
    <div className="flex flex-col gap-8 p-5 lg:grid lg:grid-cols-2">
      <ProductImages imageUrls={product.imageUrls} productName={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  )
}

export default ProductDetailsPage

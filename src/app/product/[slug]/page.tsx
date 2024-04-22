import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'

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
    <div className="">
      <ProductImages imageUrls={product.imageUrls} productName={product.name} />
    </div>
  )
}

export default ProductDetailsPage

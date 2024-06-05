import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'
import ProductInfo from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'
import ProductList from '@/components/ui/product-list'
import SectionTitle from '@/components/ui/section-title'

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) return null
  return (
    <div className="flex flex-col gap-8  pb-8">
      <div className="mt-5 flex flex-col gap-8 lg:mx-5  lg:grid lg:grid-cols-2">
        <ProductImages
          imageUrls={product.imageUrls}
          productName={product.name}
        />
        <ProductInfo
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
        />
      </div>
      <div className=" flex flex-col">
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  )
}

export default ProductDetailsPage

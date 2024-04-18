import { Badge } from '@/components/ui/badge'
import ProductItem from '@/components/ui/product-item'
import { CATEGORY_ICON } from '@/constants/category-icons'
import { computeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'

const CategoryPage = async ({ params }) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  })
  if (!category) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {category.products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={computeProductTotalPrice(product)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryPage
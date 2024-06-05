import { Badge } from '@/components/ui/badge'
import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'
import { PercentIcon } from 'lucide-react'

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    orderBy: {
      category: {
        name: 'asc',
      },
    },
  })
  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PercentIcon size={16} fill="white" />
        Ofertas
      </Badge>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4 ">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default DealsPage

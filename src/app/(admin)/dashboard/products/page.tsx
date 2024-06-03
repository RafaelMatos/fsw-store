import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prismaClient } from '@/lib/prisma'
import { PackageIcon, PlusIcon } from 'lucide-react'
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from './components/products-table'
import { computeProductTotalPrice } from '@/helpers/product'

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...computeProductTotalPrice(product),
      category: product.category,
    }))
  return (
    <div className="flex w-full flex-col gap-10 overflow-x-hidden p-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageIcon size={16} />
        Produtos
      </Badge>

      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <p className="text-xl font-bold">
          Produtos encontrados: {products.length}
        </p>
        <Button className="gap-2 font-bold">
          <PlusIcon size={16} />
          Adicionar produto
        </Button>
      </div>
      <ProductsTable products={productsWithTotalPrice} />
    </div>
  )
}

export default ProductsPage

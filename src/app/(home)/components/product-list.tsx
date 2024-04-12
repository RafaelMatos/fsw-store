import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products && products.length > 0 ? (
        products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={computeProductTotalPrice(product)}
            />
          )
        })
      ) : (
        <p className="text-sm text-gray-400">Buscando produtos...</p>
      )}
    </div>
  )
}

export default ProductList

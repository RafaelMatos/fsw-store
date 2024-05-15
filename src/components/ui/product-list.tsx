import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './carousel'

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <Carousel className="w-full">
        <CarouselContent className="ml-1 mr-10 gap-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="w-[170px] max-w-[170px]">
              <ProductItem product={computeProductTotalPrice(product)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-5 bg-background/50 hover:bg-background" />
        <CarouselNext className="right-5 bg-background/50  hover:bg-background" />
      </Carousel>
    </div>
  )
}

export default ProductList

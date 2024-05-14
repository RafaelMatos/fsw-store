import ProductItemLoading from './product-item-loading'

const ProductListLoading = () => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {Array.from({ length: 5 }).map((item, index) => {
        return (
          <div className="w-[170px] max-w-[170px]" key={index}>
            <ProductItemLoading />
          </div>
        )
      })}
    </div>
  )
}

export default ProductListLoading

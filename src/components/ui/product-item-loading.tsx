import DiscountBadge from './discount-badge'

const ProductItemLoading = () => {
  return (
    <div className="flex min-w-[170px] flex-col  gap-4">
      <div className="relative flex h-[170px] w-full animate-pulse items-center justify-center rounded-lg bg-accent">
        <DiscountBadge className="absolute left-3 top-3 "></DiscountBadge>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex h-3 w-full animate-pulse items-center justify-center  rounded-lg bg-accent" />
        <div className="flex h-4 w-[50%] animate-pulse items-center justify-center  rounded-lg bg-accent" />
      </div>
    </div>
  )
}

export default ProductItemLoading

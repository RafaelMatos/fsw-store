import { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col">
      <div className=" bg-category-item-gradient flex h-[150px] w-full items-center justify-center rounded-t-lg">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="flex justify-center rounded-b-lg bg-accent py-2">
        {category.name}
      </div>
    </div>
  )
}

export default CategoryItem

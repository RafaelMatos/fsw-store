import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`catalog/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[150px] w-full items-center justify-center rounded-t-lg bg-category-item-gradient">
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
    </Link>
  )
}

export default CategoryItem

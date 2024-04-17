import { Badge } from '@/components/ui/badge'
import { prismaClient } from '@/lib/prisma'
import { LayoutGridIcon } from 'lucide-react'
import CategoryItem from './components/category-item'

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany()
  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <LayoutGridIcon size={16} fill="white" />
        Catálogo
      </Badge>
      <div className=" grid grid-cols-2 gap-8 lg:grid-cols-3">
        {categories &&
          categories.length > 0 &&
          categories.map((category) => {
            return <CategoryItem key={category.id} category={category} />
          })}
      </div>
    </div>
  )
}

export default CatalogPage

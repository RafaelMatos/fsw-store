import { prismaClient } from '@/lib/prisma'
import CategoryItem from './category-item'

const Categories = async () => {
  const categories = await prismaClient.category.findMany()
  return (
    <div className=" grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-6">
      {categories && categories.length > 0 ? (
        categories.map((category) => {
          return <CategoryItem category={category} key={category.id} />
        })
      ) : (
        <p>Buscando categorias</p>
      )}
    </div>
  )
}

export default Categories

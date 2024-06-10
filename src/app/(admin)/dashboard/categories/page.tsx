import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prismaClient } from '@/lib/prisma'
import { ListOrderedIcon, PlusIcon } from 'lucide-react'
import CategoriesTable from './components/categories-table'

const CategoriesPage = async () => {
  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
  return (
    <div className="flex w-full flex-col gap-10 overflow-x-hidden p-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ListOrderedIcon size={16} />
        Categorias
      </Badge>

      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <p className="text-xl font-bold">
          Categorias encontradas: {categories.length}
        </p>
        <Button className="gap-2 font-bold">
          <PlusIcon size={16} />
          Adicionar categoria
        </Button>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  )
}

export default CategoriesPage

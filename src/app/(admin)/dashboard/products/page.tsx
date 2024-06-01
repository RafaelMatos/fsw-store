import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prismaClient } from '@/lib/prisma'
import { PackageIcon, PlusIcon } from 'lucide-react'

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageIcon size={16} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-xl font-bold">
          Produtos encontrados: {products.length}
        </p>
        <Button className="gap-2 font-bold">
          <PlusIcon size={16} />
          Adicionar produto
        </Button>
      </div>
      {products.map((product) => {
        return <p key={product.id}>{product.name}</p>
      })}
    </div>
  )
}

export default ProductsPage

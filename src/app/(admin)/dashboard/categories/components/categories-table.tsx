import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductWithTotalPrice } from '@/helpers/product'
import { Prisma } from '@prisma/client'

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string
  }
}

interface CategoriesProps {
  categories: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true
        }
      }
    }
  }>[]
}

const CategoriesTable = ({ categories }: CategoriesProps) => {
  return (
    <div className="flex flex-col rounded-t-lg">
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className=" rounded-tl-lg bg-accent hover:bg-[#101010] ">
              Nome
            </TableHead>
            <TableHead className=" bg-accent hover:bg-[#101010] ">
              Produtos
            </TableHead>
            <TableHead className=" rounded-tr-lg bg-accent hover:bg-[#101010] ">
              Porcentagem das Vendas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.products.length}</TableCell>
                <TableCell>{30}%</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoriesTable

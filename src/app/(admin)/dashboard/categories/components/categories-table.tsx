import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductWithTotalPrice } from '@/helpers/product'
import { Category } from '@prisma/client'

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string
  }
}

interface CategoriesProps {
  categories: Category[]
}

const CategoriesTable = ({ categories }: CategoriesProps) => {
  return (
    <div className="flex flex-col rounded-t-lg">
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className=" rounded-tl-lg bg-accent  hover:bg-accent/30">
              Nome
            </TableHead>
            <TableHead className=" bg-accent  hover:bg-accent/60">
              Produtos
            </TableHead>
            <TableHead className="rounded-tr-lg bg-accent  hover:bg-accent/60">
              Porcentagem das Vendas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{30}</TableCell>
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

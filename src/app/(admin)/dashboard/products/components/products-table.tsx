import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductWithTotalPrice } from '@/helpers/product'

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string
  }
}

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[]
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className="flex flex-col overflow-y-auto rounded-t-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" rounded-tl-lg bg-accent hover:bg-[#101010] ">
              Nome
            </TableHead>
            <TableHead className=" bg-accent hover:bg-[#101010] ">
              Categoria
            </TableHead>
            <TableHead className=" bg-accent hover:bg-[#101010] ">
              Preço total
            </TableHead>
            <TableHead className=" bg-accent hover:bg-[#101010] ">
              Preço base
            </TableHead>
            <TableHead className=" bg-accent hover:bg-[#101010] ">
              Desconto %
            </TableHead>
            <TableHead className=" rounded-tr-lg bg-accent hover:bg-[#101010] ">
              Vendidos
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>R$ {product.totalPrice.toFixed(2)}</TableCell>
                <TableCell>R$ {product.basePrice.toFixed(2)}</TableCell>
                <TableCell>{product.discountPercentage}%</TableCell>
                <TableCell>{30}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductsTable

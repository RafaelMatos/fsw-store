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
    <div className="flex flex-col rounded-t-lg">
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className=" rounded-tl-lg bg-accent hover:bg-accent/30">
              Nome
            </TableHead>
            <TableHead className=" bg-accent hover:bg-accent/60">
              Categoria
            </TableHead>
            <TableHead className=" bg-accent hover:bg-accent/60">
              Preço total
            </TableHead>
            <TableHead className=" bg-accent hover:bg-accent/60">
              Preço base
            </TableHead>
            <TableHead className=" bg-accent hover:bg-accent/60">
              Desconto %
            </TableHead>
            <TableHead className=" rounded-tr-lg bg-accent hover:bg-accent/60">
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

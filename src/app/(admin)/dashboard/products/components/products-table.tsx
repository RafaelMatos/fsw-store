import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductWithTotalPrice } from '@/helpers/product'

interface ProductsTableProps {
  products: ProductWithTotalPrice[]
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className="flex flex-col rounded-t-lg">
      <Table className="">
        <TableHeader className=" bg-accent">
          <TableRow>
            <TableHead className="rounded-tl-lg">Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço total</TableHead>
            <TableHead>Preço base</TableHead>
            <TableHead>Desconto %</TableHead>
            <TableHead className="rounded-tr-lg">Vendidos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>{product.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{product.basePrice.toFixed(2)}</TableCell>
                <TableCell>{product.discountPercentage}</TableCell>
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

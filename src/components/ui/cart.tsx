import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './badge'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Separator } from './separator'

const Cart = () => {
  const { products, subTotal, totalDiscount, total } = useContext(CartContext)

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} fill="white" />
        Carrinho
      </Badge>
      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <CartItem
                key={product.id}
                product={computeProductTotalPrice(product as any) as any}
              />
            )
          })
        ) : (
          <p className="text-center font-semibold">
            Seu carrinho está vazio. Vamos fazer compras?
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R${Number(subTotal.toFixed(2))}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>- R${Number(totalDiscount.toFixed(2))}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p> R${Number(total.toFixed(2))}</p>
        </div>
      </div>
    </div>
  )
}

export default Cart

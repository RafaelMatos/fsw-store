import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './badge'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { createOrder } from '@/actions/order'
import PriceItem from '@/app/(shop)/orders/components/price-item'

const Cart = () => {
  const { data } = useSession()
  const {
    products,
    subTotal,
    totalDiscount,
    total,
    removeAllProductsFromCart,
  } = useContext(CartContext)

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      // TODO: redirecionar para o login
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const order = await createOrder(products, (data.user as any).id)

    const checkout = await createCheckout(products, order.id)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

    removeAllProductsFromCart()

    // Criar pedido no banco
    await stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} fill="white" />
        Carrinho
      </Badge>
      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full ">
          <div className="flex flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <CartItem
                    key={product.id}
                    product={{
                      ...product,
                      totalPrice: computeProductTotalPrice(product),
                    }}
                  />
                )
              })
            ) : (
              <p className="text-center font-semibold">
                Seu carrinho está vazio. Vamos fazer compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      {products.length > 0 && (
        <div className="flex flex-col text-sm">
          <PriceItem value={subTotal} title="Subtotal" />
          <PriceItem title="Entrega" />
          <PriceItem value={totalDiscount} title="Descontos" discount />
          <PriceItem value={total} title="Total" total />
          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
            disabled={!data?.user}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart

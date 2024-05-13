import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})
export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature')!
  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Webhook Error ' + error },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lineItems = sessionWithLineItems.line_items
    // CRIAR PEDIDO
  }

  return NextResponse.json({ received: true })
}

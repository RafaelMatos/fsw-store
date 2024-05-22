import { prismaClient } from '@/lib/prisma'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lineItems = sessionWithLineItems.line_items
    // ATUALIZAR PEDIDO
    await prismaClient.order.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: 'PAYMENT_CONFIRMED',
      },
    })
  }

  return NextResponse.json({ received: true })
}

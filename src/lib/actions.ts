'use server'
import { auth, signIn } from '../../auth'
import { AuthError } from 'next-auth'

export async function googleAuthenticate() {
  try {
    await signIn('google')
  } catch (error) {
    if (error instanceof AuthError) {
      return 'google log failed'
    }
    throw error
  }
}

export async function createOrder() {
  try {
    const session = await auth()
    console.log('createOrder', session?.user)
    console.log('createOrder session', session)
  } catch (error) {
    if (error) {
      return 'Create order failed'
    }
    throw error
  }
}

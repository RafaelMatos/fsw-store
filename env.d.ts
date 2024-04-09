declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DIRECT_URL: string
    AUTH_GOOGLE_CLIENT_ID: string
    AUTH_GOOGLE_CLIENT_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    AUTH_SECRET: string
    NEXT_PUBLIC_SECRET: string
    STRIPE_SECRET_KEY: string
    NEXT_PUBLIC_STRIPE_KEY: string
    STRIPE_WEBHOOK_SECRET_KEY: string
    HOST_URL: string
    STRIPE_SECRET_KEY: string
  }
}

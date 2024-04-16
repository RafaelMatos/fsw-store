import Categories from './components/categories'
import ProductList from './components/product-list'
import { prismaClient } from '@/lib/prisma'
import SectionTitle from './components/section-title'
import PromoBanner from './components/promo-banner'

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  })
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })
  return (
    <div className="">
      <PromoBanner src="/home/banner1.svg" alt="Até 55% de desconto esse mês" />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/home/banner2.svg"
        alt="Até 55% de desconto em mouses"
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  )
}

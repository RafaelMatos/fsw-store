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
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  })
  return (
    <div className="my-8 flex flex-col gap-8">
      <PromoBanner src="/home/banner1.svg" alt="Até 55% de desconto esse mês" />
      <div className="px-5">
        <Categories />
      </div>
      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/home/banner2.svg"
        alt="Até 55% de desconto em mouses"
      />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PromoBanner
          src="/home/banner3.svg"
          alt="Até 55% de desconto em mouses"
        />
      </div>
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}

import { Separator } from '@/components/ui/separator'

interface PriceItemProps {
  total?: boolean
  discount?: boolean
  title: string
  value?: number
}
const PriceItem = ({
  total,
  title,
  value = 0,
  discount = false,
}: PriceItemProps) => {
  const withoutDiscount = discount && value === 0
  return (
    <>
      <Separator />
      <div
        className={`flex w-full justify-between py-3
        ${withoutDiscount ? 'opacity-30' : 'opacity-75'}
        ${total ? 'text-lg font-bold text-[#8162FF]' : 'text-sm '}
        `}
      >
        <p className="font-bold">{title}</p>
        <p className={discount ? 'text-green-500' : ''}>
          {discount && '- '}
          {!discount && value === 0 ? 'Grátis' : `R$ ${value.toFixed(2)}`}
        </p>
      </div>
    </>
  )
}

export default PriceItem

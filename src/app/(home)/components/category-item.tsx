import { Badge } from '@/components/ui/badge'
import { CATEGORY_ICON } from '@/constants/category-icons'
import { Category } from '@prisma/client'
interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge
      className="items-center justify-center gap-2 rounded-lg py-3"
      variant="outline"
    >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  )
}

export default CategoryItem

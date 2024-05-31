import { Button } from '@/components/ui/button'
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from 'lucide-react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="flex h-full min-w-[300px] flex-col items-center gap-8 border border-r border-solid border-accent bg-background p-8">
      <Link href="/">
        <h1 className="text-lg font-bold">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <div className="flex w-full flex-col gap-3">
        <Button variant="outline" className="w-full justify-start gap-2">
          <LayoutDashboardIcon size={16} />
          Dashboard
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <PackageIcon size={16} />
          Produtos
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <ListOrderedIcon size={16} />
          Categorias
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <PackageSearchIcon size={16} />
          Pedidos
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

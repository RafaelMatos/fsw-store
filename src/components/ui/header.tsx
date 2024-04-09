'use client'
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react'
import { Button } from './button'
import { Card } from './card'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { googleAuthenticate } from '@/lib/actions'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Separator } from './separator'

const Header = () => {
  const { status, data } = useSession()
  const handleClickSignIn = async () => {
    await googleAuthenticate()
  }
  const handleClickLogout = async () => {
    await signOut()
  }

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === 'authenticated' && data?.user && (
            <div className="flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image!} />}
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium ">
                    Olá, <span className="text-primary">{data.user.name}</span>
                  </p>
                  <p className="text-sm text-gray-400 opacity-75">
                    Boas compras!
                  </p>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-4">
            {status === 'unauthenticated' ? (
              <Button
                variant="outline"
                className="w-full justify-start gap-1"
                onClick={handleClickSignIn}
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start gap-1"
                onClick={handleClickLogout}
              >
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}

            <Button variant="outline" className="w-full justify-start gap-1">
              <HomeIcon size={16} />
              Início
            </Button>
            <Button variant="outline" className="w-full justify-start gap-1">
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Button variant="outline" className="w-full justify-start gap-1">
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-bold">
        <span className="text-primary">FSW</span> Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}

export default Header

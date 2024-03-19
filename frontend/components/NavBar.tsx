import { FC } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {
  return (
    <nav className='border-b absolute top-0 w-full flex items-center justify-center p-4 backdrop-blur-lg'>
      <div className='container min-h-10 flex items-center justify-between'>
        <div className='text-2xl font-bold '>
          ShopBlues
        </div>
        <div className='flex items-center justify-center gap-4'>
          <ThemeToggle />
          <Link className={buttonVariants({ variant: "default" })} href={`/login`}>
            Login
          </Link>
        </div>
      </div>  
    </nav>
  )
}

export default NavBar
import { Github } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className=" flex items-center justify-between bg-accent px-8 py-4 text-[0.625rem] text-gray-400">
      <div className="flex items-center gap-1">
        <p className=" text-gray-400">Developed by </p>
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB!}
          className="flex items-center  hover:text-gray-200"
        >
          <Github size={12} />
          <span className="font-semibold"> RafaelMatos</span>
        </Link>
      </div>

      <p>
        © 2023 Copyright <span className="font-semibold">FSW Store</span>
      </p>
    </div>
  )
}

export default Footer

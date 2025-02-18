import Link from "next/link"
import { Home, Map, Users } from "lucide-react"

const Header = () => {
  const pages = [
    { name: "Home", href: "/", icon: Home },
    { name: "Mindmap", href: "/mindmap", icon: Map },
    { name: "Prospects", href: "/prospects", icon: Users },
  ]

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-3xl font-bold tracking-wider hover:text-blue-200 transition-colors duration-200">
          BLEND
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  href={page.href}
                  className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-200 group"
                >
                  <page.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


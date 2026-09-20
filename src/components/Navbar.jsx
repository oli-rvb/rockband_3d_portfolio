import { NavLink, useLocation } from "react-router-dom"
import useServerClosed from "../hooks/useServerClosed"
import { INSTAGRAM_URL } from "../constants"

const Navbar = () => {
  // Home draws the header over the dark 3D scene; every other page has a light background.
  const isHome = useLocation().pathname === '/'
  const linkClass = isHome ? 'text-white' : 'text-black-500'
  const { open } = useServerClosed()

  return (
    <header className="header">
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text">BSH</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium">
            <button type="button" onClick={open} className={`${linkClass} cursor-pointer`}>
                Concerts
            </button>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} cursor-pointer`}>
                Newsletter
            </a>

        </nav>
    </header>
  )
}

export default Navbar

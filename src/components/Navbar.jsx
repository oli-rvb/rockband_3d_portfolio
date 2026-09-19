import { NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
  // Home draws the header over the dark 3D scene; every other page has a light background.
  const isHome = useLocation().pathname === '/'
  const linkClass = isHome ? 'text-white' : 'text-black-500'

  return (
    <header className="header">
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text">BSH</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium">
            <NavLink to="https://bluesuburbhour.com/index.php/a-venir/" className={linkClass} target="_blank">
                Concerts
            </NavLink>
            <NavLink to="https://bluesuburbhour.com/index.php/contact/" className={linkClass} target="_blank">
                Newsletter
            </NavLink>

        </nav>
    </header>
  )
}

export default Navbar

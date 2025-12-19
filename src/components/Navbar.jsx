import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header">
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text">BSH</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium">
            <NavLink to="https://bluesuburbhour.com/index.php/a-venir/" className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'} target="_blank">
                Concerts
            </NavLink>
            <NavLink to="https://bluesuburbhour.com/index.php/contact/" className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'} target="_blank">
                Newsletter
            </NavLink>

        </nav>
    </header>
  )
}

export default Navbar
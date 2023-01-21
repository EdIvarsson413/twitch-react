import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {
    const {user, cerrarSesion} = useContext(UserContext)

    const handleOut = async () => {
        try {
            await cerrarSesion(); //signOut tambien regresa una promesa, por lo que debe usarse el bloque try-catch
        } catch (error) {
            console.log(error.code)
        }
    }

    const botonAzul = 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3';

    const botonRojo = 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600';

    return (
        <nav className='bg-purple-400 border-gray-200 px-2 sm:px-4 py-2.5 mt-10'>
            <div className='container flex flex-wrap items-center justify-between mx-auto'>
                <Link to='/' className='flex items-center'>
                    <span className='self-center text-xl font-semibold whitespace-nowrap
                    hover:scale-110 hover:transition-all'>
                        URLShort APP
                    </span>
                </Link>
                <div className='flex md:order-2'>
                    {
                        user ?
                            (
                                <>
                                    <NavLink to='/' className={botonAzul}>Inicio</NavLink>
                                    <button onClick={handleOut} className={botonRojo}> Cerrar Sesion</button>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavLink to='/login' className={botonAzul}>Login</NavLink>
                                    <NavLink to='/registro' className={botonAzul}>Regitrarse</NavLink>
                                </>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
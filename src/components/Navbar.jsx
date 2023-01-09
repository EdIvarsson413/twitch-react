import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
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

    return (
        <div>
            {
                user ? 
                (
                    <>
                        <NavLink to='/'> Inicio  |</NavLink>
                        <button onClick={handleOut}> Cerrar Sesion</button>
                    </>
                ) 
                : 
                (
                    <>
                        <NavLink to='/login'> Login  |</NavLink>
                        <NavLink to='/registro'> Regitrarse  |</NavLink>
                    </>
                )
            }
        </div>
    )
}

export default Navbar
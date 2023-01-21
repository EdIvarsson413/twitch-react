import React, { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import {Navigate, Outlet} from 'react-router-dom'

const LayoutRequireAuth = ({children}) => {
    /* Ruta protegida: se realiza una verificación si el usuario se encuentra registrado
       si se encuentra registrado lo manda al inicio, de los contrario aparecera el login */
    const {user} = useContext(UserContext);
    
    if(!user){
        return <Navigate to='/login'/> //Navigate es equivalente a push para llevar al usuario a una vista
    }

    return (
        <div className='container mx-auto'><Outlet/></div>
    );
}

export default LayoutRequireAuth
/* context es una API que permite crear un arbol capaz de enviar datos o funiones a diferentes componentes
   o vistas que no estes anidadas. Esto es una solucion para eviatr las molestias de usar props en cada componente */
import { createContext, useEffect, useState } from "react"
import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth' //Este es un metodo para crear un nuevo usuario y registrarlo
import { signInWithEmailAndPassword } from 'firebase/auth' //Permite hacer log in con un usuario ya existente
import { signOut } from 'firebase/auth' //Con este metodo el usuario puede cerrar sesion
import { onAuthStateChanged } from "firebase/auth" //Mantiene en activo un usuario registrado

export const UserContext = createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState(false)

    //Verificar el estado del usuario
    //Se usa useEfect para mantener activa la sesion iniciada y mostrar algunos datos del usuario logeado
    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                const {email, photoURL, displayName, uid} = user;
                setUser({email, photoURL, displayName, uid});
                console.log({email, photoURL, displayName, uid});
            }
            else {
                setUser(null)
            }
        })
        return () => unSuscribe()
    }, [])

    //Se declara el metodo para ser exportado y ser usado en el componente que lo requiere
    const registrarUsuario = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    //Login con usuario registrado
    const iniciarSesion = (email, password) => signInWithEmailAndPassword(auth, email, password);
    
    //Logout
    const cerrarSesion = () => signOut(auth);

    return (
        <UserContext.Provider 
            value={
                {
                    user, setUser, 
                    registrarUsuario, 
                    iniciarSesion,
                    cerrarSesion
                }
            }>
            {props.children} {/* Permite la visualizacion de cualquier componente */}
        </UserContext.Provider>
    )
}

export default UserProvider
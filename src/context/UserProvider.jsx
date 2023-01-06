/* context es una API que permite crear un arbol capaz de enviar datos o funiones a diferentes componentes
   o vistas que no estes anidadas. Esto es una solucion para eviatr las molestias de usar props en cada componente */
import { createContext, useState } from "react"

export const UserContext = createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState(false)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children} {/* Permite la visualizacion de cualquier componente */}
        </UserContext.Provider>
    )
}

export default UserProvider
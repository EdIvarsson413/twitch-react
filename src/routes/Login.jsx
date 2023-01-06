import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Login = () => {
    //Para dar uso al context se usan el hook de react useContext, se importa la funcion de
    //UserProvider 
    const {user, setUser} = useContext(UserContext)
    const navegate = useNavigate() //useNavegate es un hook de RRD

    const handleLogin = () => {
      setUser(true);
      navegate('/'); //Esquivalente a usar el Navigate en RequireAuth.jsx
    }

    return (
      <div>
        <h1>Login</h1>
        <h2>{user ? 'En linea' : 'Offline'}</h2>
        <button onClick={handleLogin}>Accder</button>
    </div>
  )
}

export default Login
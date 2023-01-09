import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navegate = useNavigate() //useNavegate es un hook de RRD

  //Para dar uso al context se usan el hook de react useContext, se importa la funcion de
  //UserProvider 
  const {iniciarSesion} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await iniciarSesion(email, password);
      console.log('En linea')
      navegate("/");
    } catch (error) {
      console.log(error.code)
    }

    //Se vacian los campos
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Ingresa contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Iniciar Sesion</button>
      </form>
    </>
  )
}

export default Login
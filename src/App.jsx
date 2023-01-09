import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider'

function App() {
  const {user} = useContext(UserContext);

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    /*+Para tener todas las vistas se tienen que meter a una ruta global
      +Dentro de la ruta se especifica el elemento (archivo jsx) y el nombre de la ruta
      +Link no refresca la apgina como si lo hace un ancla */
    <>
      <h1>APP</h1>
      <Navbar/>
      <Routes>
        {/* Home es una ruta protegida, por lo que se envuelve en el componte  hasta ser valido*/}
        <Route path='/' element={<RequireAuth> <Home/> </RequireAuth>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registro' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App

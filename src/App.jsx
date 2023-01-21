import { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import RequireAuth from './components/layouts/LayoutRequireAuth'
import LayoutContainer from './components/layouts/LayoutContainer'
import LayoutRedirect from './components/layouts/LayoutRedirect'
import NotFound from './routes/NotFound'
import Navbar from './components/Navbar'
import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import Perfil from './routes/Perfil'

function App() {
  const {user} = useContext(UserContext);

  if(user === false){
    return <p className='text-white'>Loading...</p>
  }

  return (
    /*+Para tener todas las vistas se tienen que meter a una ruta global
      +Dentro de la ruta se especifica el elemento (archivo jsx) y el nombre de la ruta
      +Link no refresca la apgina como si lo hace un ancla */
    <>
      <Navbar/>
      <Routes>
        {/* Cuando se ingresa a una ruta no existente */}
        <Route path='/:nanoid' element={<LayoutRedirect/>}>
          <Route path='*' index element={<NotFound />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path='/' element={<RequireAuth/>}>
          <Route index element={<Home/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
        </Route>

        {/* Para que 2 rutas compartan el mismo layout se puede volver a usar un Route que engloble las rutas que 
            compartiran el layout */}
        <Route path='/' element={<LayoutContainer/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

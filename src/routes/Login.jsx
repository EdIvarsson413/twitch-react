import { useContext, useState} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebse"
import { formValidate } from "../utils/formValidate"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import Titulo from "../components/Titulo"
import Boton from "../components/Boton"
import BotonLoading from "../components/BotonLoading"

const Login = () => {
  //Para dar uso al context se usan el hook de react useContext, se importa la funcion de
  //UserProvider.jsx 
  const {iniciarSesion} = useContext(UserContext)
  const navegate = useNavigate() //useNavegate es un hook de RRD
  const [loading, setLoading] = useState(false);

  //metodos o hooks para manipulacion de formularios
  const { register, handleSubmit, setError, formState: {errors} } = useForm();

  //Validaciones para formularios
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  //vale lo mismo hacer destructura de data que retorna hook form
  const onSubmit = async ({email, password}) => {
    try {
      setLoading(true);
      await iniciarSesion(email, password);
      console.log('En linea')
      navegate('/');
    } catch (error) {
      console.log(error.code);
      const {code, message} = erroresFirebase(error);
      setError(code, {message});
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Titulo texto='Log In'/>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <FormInput
          type="email"
          placeholder="Ingresa Email"
          label='Correo'
          error={errors.email}
          {...register('email', { required, pattern: patternEmail })}
        //Este prop funciona como un state en lugar de value y onChange para actualiza campos
        >
          { /* Validacion de email */}
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingresa contraseña"
          label='Contraseña'
          error={errors.password}
          {...register('password', { minLength, validate: validateTrim })}
        >
          { /* Validar que la contraseña tiene al menos 6 caracteres */}
          <FormError error={errors.password} />
        </FormInput>

        { /* Animacion de loading */ }
        <Boton 
          texto='Iniciar Sesion' 
          type='submit' 
          color="bg-purple-700 hover:bg-purple-800 focus:ring-purple-300"
          separacion="mt-3 text-center"
          loading={loading}
        />
      </form>
    </>
  )
}

export default Login
import { useContext} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebse"
import { formValidate } from "../utils/formValidate"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"

const Login = () => {
  //Para dar uso al context se usan el hook de react useContext, se importa la funcion de
  //UserProvider.jsx 
  const {iniciarSesion} = useContext(UserContext)
  const navegate = useNavigate() //useNavegate es un hook de RRD

  //metodos o hooks para manipulacion de formularios
  const { register, handleSubmit, setError, formState: {errors} } = useForm();

  //Validaciones para formularios
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  //vale lo mismo hacer destructura de data que retorna hook form
  const onSubmit = async ({email, password}) => {
    try {
      await iniciarSesion(email, password);
      console.log('En linea')
      navegate('/');
    } catch (error) {
      console.log(error.code);
      setError('firebase', {message: erroresFirebase(error.code)})
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <FormInput
          type="email"
          placeholder="Ingresa Email"
          {...register('email', { required, pattern: patternEmail })}
        //Este prop funciona como un state en lugar de value y onChange para actualiza campos
        >
          { /* Validacion de email */}
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingresa contraseña"
          {...register('password', { minLength, validate: validateTrim })}
        >
          { /* Validar que la contraseña tiene al menos 6 caracteres */}
          <FormError error={errors.password} />
        </FormInput>

        <button type="submit">Iniciar Sesion</button>

        {/* Validaciones de firebase */}
        <FormError error={errors.firebase}/>
      </form>
    </>
  )
}

export default Login
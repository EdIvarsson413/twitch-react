import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebse";
import { formValidate } from "../utils/formValidate";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Titulo from "../components/Titulo";
import Boton from "../components/Boton";
import BotonLoading from "../components/BotonLoading";

const Register = () => {
    //Hooks
    const {registrarUsuario} = useContext(UserContext); //context que contiene todas las funciones englobadas
    const navegate = useNavigate(); //hook de RR DOM para empujar a una vista
    const [loading, setLoading] = useState(false);

    //metodos o hooks para manipulacion de formularios
    const { register, handleSubmit, getValues, setError, formState: {errors} } = useForm();

    //Validaciones para formularios
    const { required, patternEmail, minLength, validateTrim, validateCoinciden } = formValidate();

    const onSubmit = async data => {
        //data contiene lo que se ingreso en todos los campos y es un objeto, por lo tanto, puede hacerse destructura
        const {email, password} = data;
        
        //Se extrae del contexto el metodo creado en UserProvider, ya que se devuelve una promesa debe 
        //de realiza un bloque try-catch
        try {
            setLoading(true);
            await registrarUsuario(email, password);
            console.log('Usuario creado')
            navegate('/');
        } catch (error) {
            //Si ocurre algun error este sera leido y sera seteado en el hook form
            console.log(error.code)
            const {code, message} = erroresFirebase(error);
            setError(code, {message});
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Titulo texto='Registrarse'/>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <FormInput 
                    type="email" 
                    placeholder="Ingresa Email"
                    label='Correo'
                    error={errors.email}
                    {...register('email', { required, pattern: patternEmail})}
                    //Este prop funciona como un state en lugar de value y onChange para actualiza campos
                >
                    { /* Validacion de email */ }
                    <FormError error={errors.email}/>
                </FormInput>

                <FormInput 
                    type="password"
                    placeholder="Ingresa contraseña"
                    label='Contraseña'
                    error={errors.password}
                    {...register('password', { minLength, validate: validateTrim })} 
                >
                    { /* Validar que la contraseña tiene al menos 6 caracteres */ }
                    <FormError error={errors.password}/>
                </FormInput>

                <FormInput 
                    type="password"
                    placeholder="Reingresa contraseña"
                    label='Repite contraseña'
                    error={errors.repassword}
                    {...register('repassword', {
                        validate: validateCoinciden(getValues('repassword'))
                    })}
                >
                    { /* Validar que las contraseñas sean iguales */ }
                    <FormError error={errors.repassword}/>
                </FormInput>

                { /* Animacion de loading */ }
                <Boton 
                    texto='Iniciar Sesion' 
                    type='submit' 
                    color="bg-purple-700 hover:bg-purple-800 focus:ring-purple-300"
                    separacion="mt-3 text-center"
                    loading={loading}/>
            </form>
        </>
    )
}

export default Register
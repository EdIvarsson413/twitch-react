import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {registrarUsuario} = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        //Se extrae del contexto el metodo creado en UserProvider, ya que se devuelve una promesa debe 
        //de realiza un bloque try-catch
        try {
            await registrarUsuario(email, password);
            console.log('Usuario creado')
            navegate('/');
        } catch (error) {
            console.log(error.code)
        }
        
        //Se vacian los campos
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <h1>Registrar</h1>
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

                <button type="submit">Registrar</button>
            </form>
        </>
    )
}

export default Register
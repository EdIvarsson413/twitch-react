export const erroresFirebase = (error) => {
    //Si ocurre algun error este sera leido y sera seteado en el hook form
    switch(error.code){
        case 'auth/email-already-in-use': 
            return {
                code: 'email',
                message: 'Usuario ya registrado'
            };
        case 'auth/invalid-email': 
            return {
                code:'email',
                message: 'Correo inválido',
            }; 
        case 'auth/wrong-password': 
            return {
                code: 'password',
                message: 'Contraseña incorrecta',
            }; 
        case 'auth/user-not-found': 
            return { 
                code:'email',
                message: 'El usuario no existe',
            };
        default: 
            return {
                code: 'email',
                message: 'Error en el servidor',
            };
    }
};
export const erroresFirebase = (code) => {
    //Si ocurre algun error este sera leido y sera seteado en el hook form
    switch(code){
        case 'auth/email-already-in-use': return 'Usuario ya registrado';
        case 'auth/invalid-email': return 'Correo inválido'; 
        case 'auth/wrong-password': return 'Contraseña incorrecta'; 
        case 'auth/user-not-found': return 'El usuario no existe';
        //case ''
        default: return 'Error en el servidor';
    }
};
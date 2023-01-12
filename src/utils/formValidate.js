//este archivo fue creado para contener todas las funciones necesarias para el formulario con React Hook Form
//De esta forma se pueden reutilizar estas validaciones a otros formularios que lo requieran
export const formValidate = () => { 
    //Este metodo devuelve un objeto al que se le pueden extraer las validaciones necesarias
    return {
        required: { //Este prop funciona como un state en lugar de value y onChange para actualiza campos
            value: true,
            message: 'Campo obligatorio'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9]+)*(\.[a-z]{2,15})/,
            message: 'Formato de Email incorrcto'
        },
        minLength: {
            value: 6, 
            message: "Minimo 6 caracteres"
        },
        validateTrim: {
            trim: v => {
                if(!v.trim()) return "Escribe la contraseña, payaso :v"
                
                return true
            }
        },
        validateCoinciden(getValues) {
            return {equals: v => v === getValues('password') || 'Las contraseñas no coinciden'}
        },
    }
};
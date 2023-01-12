//Este componente sirve de plantilla a los campos de los formularios para englobar sus props en comun

import { forwardRef } from "react"

const FormImput = forwardRef((
    {type, placeholder, onChange, onBlur, name, children },ref) => {
        return (
            <div>
                <input 
                    type={type} 
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                />
                {children}
            </div>
        )
})

export default FormImput
//Este componente sirve de plantilla a los campos de los formularios para englobar sus props en comun

import { forwardRef } from "react"

const FormImput = forwardRef((
    {type, placeholder, onChange, onBlur, name, label, error, editar, children },ref) => {
        //A traves de props, se recibe el error detectado y se cambian las clases de css dependiendo del estado del error 
        const errorLabel = error ? 'font-semibold text-red-700' : 'text-white';
        const errorInput = error ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 focus:shadow-red-200/50 ' 
        : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-900 focus:border-purple-900 focus:shadow-indigo-500/50';
        
        const editarinput = editar && 'focus:ring-yellow-900 focus:border-yellow-900 focus:shadow-yellow-500/50'
        return (
            <div className="mt-6">
                <label className={`block mb-2 text-sm font-medium ${errorLabel}`}>{label}</label>
                <input 
                    className={`text-sm rounded-lg block w-full p-2.5 focus:scale-110 focus:transition-all
                    focus:shadow-xl ${errorInput} ${editarinput}`}
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
    }
)

export default FormImput
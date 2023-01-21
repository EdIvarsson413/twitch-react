import React from 'react'

const FormError = ({error}) => {
    return (
        <div>
            {error && 
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-bold">Oops!</span> {error.message}
                </p>}
        </div>
    )
}

export default FormError
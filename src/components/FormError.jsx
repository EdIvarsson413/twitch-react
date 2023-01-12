import React from 'react'

const FormError = ({error}) => {
    return (
        <div>
            {error && <p>{error.message}</p>}
        </div>
    )
}

export default FormError
import React from 'react'

const LayoutModal = ({setModal}) => {
    return (
    <main className='bg-black/[0.5] inset-0 fixed transition-all duration-300'>
        <div className='container mx-auto w-64 text-center'>
            <h1 
                className='bg-white p-3 my-56 shadow-red-200/50 shadow-lg rounded-lg font-semibold' 
                onClick={() => setModal(false)}
            >
                Copiado al portapapeles! :D
            </h1>
        </div>
    </main>
    )
}

export default LayoutModal
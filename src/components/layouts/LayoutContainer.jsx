import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='container w-96 mx-auto mt-8'>
            <Outlet/>
        </div>
    )
}

export default Layout
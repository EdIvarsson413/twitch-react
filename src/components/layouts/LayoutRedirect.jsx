import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom"
import useFirestore from "../../hooks/useFirestore"
import Titulo from "../Titulo";

const LayoutRedirect = () => {
    //Hook de RR DOM para leer params
    const { nanoid } = useParams()
    const { getOrigin } = useFirestore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrigin(nanoid)
            .then(docSnap => {
                if(docSnap.exists()){
                    window.location.href = docSnap.data().origin;
                }
                else {
                    setLoading(false);
                }
            })
    }, [])

    if(loading) return <Titulo texto='Redireccionando'/>
    return (
        <div className="container mx-auto">
            <Outlet/>
        </div>
    )
}

export default LayoutRedirect
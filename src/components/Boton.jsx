import BotonLoading from './BotonLoading'

const Boton = ({texto, type, color, separacion = '', loading, onClick}) => {
    if(loading) return <BotonLoading color={color} separacion={separacion}/>

    //tanto este boton como el de carga pueden recibir mas clases de tailwind sin necesidad de usar div auxiliares salvo sea necesario
    return (
        <div className={separacion}>
            <button 
                type={type}
                className={`focus:outline-none text-white hover:scale-110 hover:transition-all focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ` + color}
                onClick={onClick}
                >
                    {texto}
            </button>
        </div>
    )
}

export default Boton
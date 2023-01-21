import { useEffect, useState } from "react";
import { formValidate } from '../utils/formValidate'
import { useForm } from "react-hook-form";
import Boton from "../components/Boton";
import Titulo from "../components/Titulo"
import useFirestore from "../hooks/useFirestore"
import FormImput from "../components/FormInput";
import FormError from "../components/FormError";
import LayoutModal from "../components/layouts/LayoutModal";

const Home = () => {
  //State
  const [aux, setAux] = useState('');
  const [newUrlID, setNewUrlID] = useState();
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);

  //Hooks
  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore(); //Hook creado para usar Firestore
  const { required, patternURL } = formValidate();
  const { register, handleSubmit, formState: {errors}, setError, resetField, setValue } = useForm();

  //Para obtener datos solo basta con obtenerlos una vez
  useEffect(() => {
    getData();
  }, [aux])

  if(loading.getData) return <p className="mt-10 text-white">Cargando datos...</p>
  if(error) return <p>{error}</p>

  //Agrega nuevo URL
  const onSubmit = async ({url}) => {
    try {
      //Actualizar URL
    if(newUrlID){
      await updateData(newUrlID, url);
      setNewUrlID('');
      setEditar(false)
      setAux('up');
    }
    else {
      //Cuando es un nuevo URL
      await addData(url); 
      setAux('add')
    }

    } catch (error) {
      console.log(error.code)
      const {code, message} = erroresFirebase(error);
      setError(code, {message});
    }
    //Metodo de hook form para reiniciar campos de texto
    resetField('url');
  }

  //Edita URL
  const handleUpdate = (item) => {
    setValue('url', item.origin); //Metodod de hook form para que ponga la url en el input 
    setNewUrlID(item.nanoid);
    setEditar(true);
  }

  //Elimina URL
  const handleDelete = async (nanoid) => {
    await deleteData(nanoid);
    setAux('del');
  }

  //Copiar una URL
  const handleCopy = async(nanoid) => {
    //Obetener el host 
    const pathURL = window.location.href;

    //Por medio de la API clipboard se copia el link al portapapeles
    await navigator.clipboard.writeText(pathURL + nanoid)
    
    //Activa la ventana modal del mensaje de copiado
    setModal(true);

    //El modal no se mantiene por mucho tiempo, por lo que aqui mismo se especifica cuantos ms durara activa
    setTimeout( () => {
      setModal(false);
    }, 600)
  }

  return (
    <>
      <Titulo texto='Inicio' />
      <main className="container mx-auto w-9/12">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <FormImput
            label='Escribe una URL'
            type='text'
            placeholder='http://google.com'
            editar={editar}
            {...register('url', {
              required,
              pattern: patternURL,
            })}
            error={errors.url}
          >
            <FormError error={errors.url} />
          </FormImput>

          {
            /* El boton para editar o agregar url depende si ya se sacó el ID de la url seleccionada */
            newUrlID ?
              <Boton
                type='submit'
                texto='Editar URL'
                color="bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 hover:shadow-lg hover:shadow-yellow-100/50"
                separacion="mt-4"
                loading={loading.updateData}
              />
              :
              <Boton
                type='submit'
                texto='Agregar URL'
                loading={loading.addData}
                color='bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 hover:shadow-lg hover:shadow-indigo-500/50'
                separacion="mt-4"
              />
          }
        </form>

        {
          data.map(item => (
            <div className="w-full p-6 bg-gray-600 border border-gray-200 rounded-lg shadow-md my-5" key={item.nanoid}>
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-black">{window.location.href + item.nanoid}</h5>
              <p className="mb-3 font-normal text-gray-300 text-lg">{item.origin}</p>

              <div className="flex justify-end gap-4">
                <Boton
                  type='button'
                  texto='Editar'
                  color='bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 hover:shadow-lg hover:shadow-yellow-100/50'
                  onClick={() => handleUpdate(item)}
                />
                <Boton
                  type='button'
                  texto='Eliminar'
                  color='bg-red-700 hover:bg-red-800 focus:ring-red-300 hover:shadow-lg hover:shadow-red-200/50'
                  onClick={() => handleDelete(item.nanoid)}
                />
                <Boton
                  type='button'
                  texto='Copiar'
                  color='bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 hover:shadow-lg hover:shadow-pink-100/50'
                  onClick={() => handleCopy(item.nanoid)}
                />
              </div>
            </div>
          ))
        }
      </main>

      {
        modal && <LayoutModal setModal={setModal}/>
      }

    </>
  )
}

export default Home
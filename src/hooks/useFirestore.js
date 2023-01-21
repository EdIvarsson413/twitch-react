import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { useState } from "react"
import { db, auth } from "../firebase";
import { nanoid } from 'nanoid'

//Este es un hook para realizar entrada y salida de datos a Firestore 
const useFirestore = () => {
    //Este data contendra todos los docuemntos de firestore
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

    //Ademas usar el metodo de la dccumentacion, se debe usar otro ya que para extarer requiere de promesas
    //Extraer todos los documentos
    const getData = async () => {
        try {
            //Prev permite traer informacion previa del state, en este caso atributo de un objeto 
            setLoading(prev => ({...prev, getData: true}));
            
            //Metodo para realizar una consulta y pasarla al state
            const dataRef = collection(db, 'urls');
            const q = query(dataRef, where('uid', '==', auth.currentUser.uid));  //el where es propio de firebase y los operadores no son los mismo que JS

            //Metodo de la documentacion oara extraer datos
            const querySnapshot = await getDocs(q);     //getDoc obtiene la referencia desde la consulta

            //Del query hecho se extraen los datos
            const dataDB = querySnapshot.docs.map(doc => doc.data())

            //Una vez hecho entra al state de datos
            setData(dataDB);
        } catch (error) {
            console.log(error.code);
            setError(error.message);
        }finally {
            setLoading(prev => ({...prev, getData: false}));
        }
    }

    //Agregar documento
    const addData = async(url) => {
        try {
            setLoading(prev => ({...prev, addData: true}));
            
            //Se puede representar con un objeto un documento nuevo
            const newDoc = {
                nanoid: nanoid(6),
                origin: url,
                enable: true,
                uid: auth.currentUser.uid
            };

            //Se crea la referencia al documento y se guarda en la DB por promesas
            const docRef = doc(db, 'urls', newDoc.nanoid);
            await setDoc(docRef, newDoc);

            //Una vez en la DB, el documento se refleja en el state con operador de copia
            setData([...data, newDoc]);
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally{
            setLoading(prev => ({...prev, addData: false}));
        }
    }

    //Eliminar
    const deleteData = async(nanoid) => {
        try {
            //se segraga el nanoid para identificar que boton realiza el loading
            setLoading(prev => ({...prev, [nanoid]: true}));
            
            //Se crea la referencia al documento y se guarda en la DB por promesas
            const docRef = doc(db, 'urls', nanoid);
            await deleteDoc(docRef);

            //Por medio de JS se hace un filtrado del arreglo con datos
            setData(data.filter(item => item.nano !== nanoid))
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally{
            setLoading(prev => ({...prev, [nanoid]: false}));
        }
    }

    //Actualizar un docuemnto 
    const updateData = async (nanoid, newURL) => {
        try {
            setLoading((prev) => ({...prev, updateData: true}));
            const docRef = doc(db, 'urls', nanoid);
            await updateDoc(docRef, {origin: newURL}); //Se pueden cambiar los campos del documento por medio de objeto
            setData(data.map(item => item.nanoid === nanoid ? ({...item, origin: newURL}) : item));
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({...prev, updateData: false}));
        }
    }

    //Obtener un atributo de un documento (origin)
    const getOrigin = async(nanoid) => {
        try {
            //Referencia al documento para sacar el origin
            const docRef = doc(db, 'urls', nanoid);
            const docSnap = await getDoc(docRef);
            
            return docSnap
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
    //se devuelven los datos junto con el booleano y error 
    return {
        data,
        error,
        loading,
        getData,
        addData,
        deleteData,
        updateData,
        getOrigin,
    }
}

export default useFirestore
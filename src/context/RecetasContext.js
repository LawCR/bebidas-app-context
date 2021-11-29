import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const RecetasContext = createContext()

const RecetasProvider = (props) => {

    // Estado para almacenar las recetas
    const [recetas, setRecetas] = useState([])
    // Estado para obtener los datos mandando por el Formulario
    const [busquedaRecetas, setBusquedaRecetas] = useState({
        nombre: '',
        categoria: '',
    })
    // Estado para realizar la consulta a la api cuando este en true - lo mandaremos al submit al formulario
    const [consultar, setConsultar] = useState(false)

    const {nombre, categoria} = busquedaRecetas
    // EFecto para llamar a la api
    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async() => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}&i=${nombre}`
           
                const resultado = await axios.get(url)
                setRecetas(resultado.data.drinks)
            }
            obtenerRecetas()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nombre, categoria])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBusquedaRecetas,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider

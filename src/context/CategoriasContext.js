import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// Crear el Context
export const CategoriasContext = createContext()

// Siempre que se crea un context debes crear un Provider
// El provider es de donde se encuentran los datos(states) y funciones


const CategoriasProvider = (props) => {
    // crear el state del Context
    const [categorias, setCategorias] = useState([])

    // Ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async() => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
            const categorias = await axios.get(url)
            setCategorias(categorias.data.drinks);
        }
        obtenerCategorias()
    }, [])
    
    return (
        <CategoriasContext.Provider
            //Valores que estaran disponibles en todos los componentes
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider
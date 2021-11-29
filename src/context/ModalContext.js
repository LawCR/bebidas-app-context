import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// crear el context
export const ModalContext = createContext()


const ModalProvider = (props) => {

    // state del provider que usaremos para obtener el id de la receta
    const [idReceta, setIdReceta] = useState(null)
    // state del provider que usaremos para almacenar los detalles de la receta
    const [infoReceta, setInfoReceta] = useState({})

    // Una vez que tenemos una receta(id) llamar a la api
    useEffect(() => {
        const obtenerReceta = async() => {
            if (!idReceta) return
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const resultado = await axios.get(url)
            setInfoReceta(resultado.data.drinks[0]);
        }
        obtenerReceta()
    }, [idReceta])

    return (
        <ModalContext.Provider
            value={{
                infoReceta,
                setIdReceta,
                setInfoReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

const Formulario = () => {
    // states propios del componente formulario
    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })
    const [error, setError] = useState(false)
    // Obtenemos categorias de context usando el hook
    const { categorias } = useContext(CategoriasContext)

    const {setBusquedaRecetas, setConsultar} = useContext(RecetasContext)

    // Función para leer los contenidos
    const obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    
    const HandleSubmitRecetas = (e) => {
        e.preventDefault()
        if (busqueda.nombre.trim() === '' || busqueda.categoria.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        setBusquedaRecetas(busqueda)
        setConsultar(true)
    }
 

    return (
        
        <form 
            className="col-12"
            onSubmit={HandleSubmitRecetas}
        >
            {
               // error ? (<Error tipo='warning' mensaje='Los 2 campos son requeridos' />) : null
                error ? <p className="alert alert-primary text-center p2">Todos los campos son obligatorios</p> : null
            }
            <fieldset className="text-center">
                <legend> Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-sm-12 col-md-6 col-lg-4 mt-2">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 mt-2">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">Seleccion Categoría</option>
                        {
                            categorias.map(categoria => (
                                <option 
                                    key={categoria.strCategory} 
                                    value={categoria.strCategory}
                                >{categoria.strCategory}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 mt-2">
                    <input 
                        type="submit"
                        className="btn btn-block btn-info"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
    )
}

export default Formulario

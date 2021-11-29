import React, { useContext, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalContext } from '../context/ModalContext'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 500,
      //height: '100%',
      maxHeight: 900,
      overflow: 'scroll',
    },
    header: {
        textAlign: 'center',
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    }
  }));

const Receta = ({receta}) => {

    // Configuración del modal de material-ui
    const [open, setOpen] = useState(false)
    
    const classes = useStyles()

    const handleOpen = () => { 
        setOpen(true)
    }

    const handleClose = () => { 
        setOpen(false)
    }

    // extraer valores del context
    const { infoReceta, setIdReceta, setInfoReceta}  = useContext(ModalContext)

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = (infoReceta) => {
        let ingredientes = []
        for (let i = 0; i < 16; i++) {
            if (infoReceta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={infoReceta[`strIngredient${i}`]} >{infoReceta[`strIngredient${i}`]} {infoReceta[`strMeasure${i}`] } </li>
                )
            }
        }
        return ingredientes
    }

    return (
        <div className="col-md-6 col-lg-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink} </h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} ></img>
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-info btn-block"
                        onClick= {() => {
                            setIdReceta(receta.idDrink)
                            handleOpen()
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={() => {
                            setIdReceta(null)
                            setInfoReceta({})
                            handleClose()
                        }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open} >
                            <div className={classes.paper}>
                                <h2 className={classes.header} >{infoReceta.strDrink} </h2>
                                <h3 className="mt-4">Instrucciones</h3>
                                <p>
                                    {infoReceta.strInstructions}
                                </p>
                                <img className="img-fluid my-4" src={infoReceta.strDrinkThumb} alt={infoReceta.strDrink} />
                                <h3>Ingredientes y cantidad</h3>
                                <ul>
                                    {mostrarIngredientes(infoReceta)}
                                </ul>
                                <button 
                                    type="button"
                                    className="btn btn-info btn-block"
                                    onClick= {() => {
                                        handleClose()
                                    }}
                                >
                                    Volver
                                </button>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Receta

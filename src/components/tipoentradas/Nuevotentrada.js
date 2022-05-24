import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';



function nuevoTEntrada({history}) {
    //FORMULARIO
    const [tipoentrada, guardarTEntrada] = useState({
        nombre: '',


    });
    const consultarAPI = async () => {
        const tentradasConsulta = await clienteAxios.get('/tipoentradas');
        //colocar el resultado en el state
        guardarTEntrada(tentradasConsulta.data);
    }
    const actualizarState = e =>{
        ///almacenar lo que escribe
        guardarTEntrada({
            //obtener una copia de lo que va escribiendo
            ...tipoentrada,
            [e.target.name] : e.target.value
        })
    }


    //use effect componentdidmount will moun
    const agregarTEntrada = e => {
        e.preventDefault();
        
        //enviar peticion
        clienteAxios.post('/nuevotentrada', tipoentrada)
        .then(res=>{
            if (res.data.code === 11000) {
               Swal.fire({
                   icon: 'error',
                   title: 'Hubo un error',
                   text: 'Ese mail ya se encuentra registrado'
    
               })
            }else{
    
                    Swal.fire(
                    'Good job!',
                    res.data.mensaje,
                    'success'
                )
            }
    
            //a donde quiero que me reedireccione
            history.push('/tipoentradas')
        });
    }
    

    useEffect(() => {
        consultarAPI();
    }, []);
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-sm-6'>
            <form 
            onSubmit={agregarTEntrada}>
                <label className='form-label'>Detalle</label>
                <input onChange={actualizarState} className='form-control' type="text" name="nombre" placeholder='sueldos'/>
                <button type="submit" className='btn btn-danger mt-3'>Enviar</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default withRouter(nuevoTEntrada);
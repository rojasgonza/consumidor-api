import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';



function nuevaSalida({history}) {
    //FORMULARIO
    const [salida, guardarSalida] = useState({
        detalle: '',
        monto:'',
        tipogastoId: ''

    });
    const actualizarState = e =>{
        ///almacenar lo que escribe
        guardarSalida({
            //obtener una copia de lo que va escribiendo
            ...salida,
            [e.target.name] : e.target.value
        })
    }



    ///MUESTRA DE SELECT PARA TIPO DE ENTRADA
    //state entrada = state, guardarEntraddas = funcion para guardar entradas
    const [tgasto, guardartGasto] = useState([]);

    //QUERY
    const consultarAPI = async () => {
        const tgastoConsulta = await clienteAxios.get('/tipogasto');
        //colocar el resultado en el state
        guardartGasto(tgastoConsulta.data);
    }

    //use effect componentdidmount will moun
    const agregarSalida = e => {
        e.preventDefault();
        
        //enviar peticion
        clienteAxios.post('/nuevasalida', salida)
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
            history.push('/salidas')
        });
    }
    

    useEffect(() => {
        consultarAPI();
    }, []);
    return(
        <div className='container'>
            <h2>Nueva salida</h2>
            <div className='row'>
                <div className='col-md-8 col-sm-6'>
            <form 
            onSubmit={agregarSalida}>
                <label className='form-label'>Detalle</label>
                <input onChange={actualizarState} className='form-control' type="text" name="detalle" placeholder='auto'/>
                <label className='form-label'>Monto</label>
                <input onChange={actualizarState} className='form-control' type="number" name="monto" step="any" placeholder='$1000'/>
                {/* <label className='form-label'>Fecha</label>
                <input onChange={actualizarState} className='form-control' type="date" name='updatedAt' /> */}
                <label className='form-label'>Tipo de gasto</label>
                <select onChange={actualizarState} className='form-control' name="tipogastoId">
                    <option>NASHE</option>
                     {tgasto.map(tgasto => (
                         <option
                        key={tgasto.id}
                        value={tgasto.id}>{tgasto.nombre}</option>
                    ))}
                        </select>
                <button type="submit" className='btn btn-danger mt-3'>Enviar</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default withRouter(nuevaSalida);
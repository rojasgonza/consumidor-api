import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import  {withRouter} from 'react-router-dom';



function editarSalida(props) {
    const {id} = props.match.params;
    //FORMULARIO
    const [salida, datosSalida] = useState({
        detalle: '',
        monto:'',
        tipogastoId: ''

    });
    //useefect

    const actualizarState = e =>{
        ///almacenar lo que escribe
        datosSalida({
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
        const salidasConsulta = await clienteAxios.get(`/salidas/${id}`);
        datosSalida(salidasConsulta.data); 
    }

    //use effect componentdidmount will moun
    const editarSalida = e => {
        e.preventDefault();
        
        //enviar peticion
        clienteAxios.put(`/salidas/editar/${salida.id}`, salida)
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
            props.history.push('/')
        });
    }
    

    useEffect(() => {
        consultarAPI();
    }, []);
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-sm-6'>
            <form onSubmit={editarSalida}>
                <label className='form-label'>Detalle</label>
                <input value={salida.detalle}
                    onChange={actualizarState} className='form-control' type="text" name="detalle" placeholder='auto'/>
                <label className='form-label'>Monto</label>
                <input value={salida.monto} onChange={actualizarState} className='form-control' type="number" name="monto" step="any" placeholder='$1000'/>

                <label className='form-label'>Tipo de gasto</label>
                <select value={salida.tipogastoId}
                onChange={actualizarState} className='form-control' name="tipogastoId">
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
export default withRouter(editarSalida);
import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import  {withRouter} from 'react-router-dom';



function editarEntrada(props) {
    const {id} = props.match.params;
    //FORMULARIO
    const [entrada, datosEntrada] = useState({
        detalle: '',
        monto:'',
        tipoentradaId: ''

    });
    //useefect

    const actualizarState = e =>{
        ///almacenar lo que escribe
        datosEntrada({
            //obtener una copia de lo que va escribiendo
            ...entrada,
            [e.target.name] : e.target.value
        })
    }



    ///MUESTRA DE SELECT PARA TIPO DE ENTRADA
    //state entrada = state, guardarEntraddas = funcion para guardar entradas
    const [tentradas, guardartEntradas] = useState([]);

    //QUERY
    const consultarAPI = async () => {
        const tentradasConsulta = await clienteAxios.get('/tipoentradas');
        //colocar el resultado en el state
        guardartEntradas(tentradasConsulta.data);
        const entradasConsulta = await clienteAxios.get(`/entradas/${id}`);
        datosEntrada(entradasConsulta.data); 
    }

    //use effect componentdidmount will moun
    const editarEntrada = e => {
        e.preventDefault();
        
        //enviar peticion
        clienteAxios.put(`/entradas/editar/${entrada.id}`, entrada)
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
            <form onSubmit={editarEntrada}>
                <label className='form-label'>Detalle</label>
                <input value={entrada.detalle}
                    onChange={actualizarState} className='form-control' type="text" name="detalle" placeholder='auto'/>
                <label className='form-label'>Monto</label>
                <input value={entrada.monto} onChange={actualizarState} className='form-control' type="number" name="monto" step="any" placeholder='$1000'/>

                <label className='form-label'>Tipo de gasto</label>
                <select value={entrada.tipoentradaId}
                onChange={actualizarState} className='form-control' name="tipoentradaId">
                    <option>NASHE</option>
                    
                     {tentradas.map(tentrada => (
                         <option
                        key={tentrada.id}
                        value={tentrada.id}>{tentrada.nombre}</option>
                    ))}
                        </select>
                <button type="submit" className='btn btn-danger mt-3'>Enviar</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default withRouter(editarEntrada);
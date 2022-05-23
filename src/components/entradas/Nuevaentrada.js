import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';



function nuevaEntrada() {
    //FORMULARIO
    const [entrada, guardarEntrada] = useState({
        detalle: '',
        monto:'',
        tipoentradaId: ''

    });
    const actualizarState = e =>{
        ///almacenar lo que escribe
        guardarEntrada({
            //obtener una copia de lo que va escribiendo
            ...entrada, [e.target.name] : e.target.value
        })
    }


    const agregarEntrada = e =>{
        e.preventdefault();
        //enviar query
        clienteAxios.post('/nuevaentrada', entrada)
            .then(res => {
                console.log(res)
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
    }

    //use effect componentdidmount will mount

    useEffect(() => {
        consultarAPI();
    }, []);
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-sm-6'>
            <form 
            onSubmit={agregarEntrada}>
                <label className='form-label'>Detalle</label>
                <input onChange={actualizarState} className='form-control' type="text" name="detalle" placeholder='auto'/>
                <label className='form-label'>Monto</label>
                <input onChange={actualizarState} className='form-control' type="number" name='monto' placeholder='$1000'/>
                {/* <label className='form-label'>Fecha</label>
                <input onChange={actualizarState} className='form-control' type="date" name='updatedAt' /> */}
                <label className='form-label'>Vaya</label>
                <select onChange={actualizarState} className='form-control' name='tipoentradaId'>
                    
                     {tentradas.map(tentrada => (
                         <option
                        key={tentrada.id}
                        value={tentrada}>{tentrada.nombre}</option>
                    ))}
                        </select>
                <input type="submit"  value="enviar" className='btn btn-danger mt-3'/>
            </form>
            </div>
            </div>
        </div>
    )
}
export default nuevaEntrada;
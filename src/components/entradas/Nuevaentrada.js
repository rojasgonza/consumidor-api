import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';



function nuevaEntrada() {
    

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
            <form>
                <label className='form-label'>Detalle</label>
                <input className='form-control' placeholder='auto'/>
                <label className='form-label'>Monto</label>
                <input className='form-control' placeholder='$1000'/>
                <label className='form-label'>Vaya</label>
                <select className='form-control'>
                    <option>Valor</option>
                     {tentradas.map(tentrada => (
                         <option
                        key={tentrada.id}
                        value={tentrada}>{tentrada.nombre}</option>
                    ))}
                        </select>
                <input type="submit" value="enviar" className='btn btn-danger mt-3'/>
            </form>
            </div>
            </div>
        </div>
    )
}
export default nuevaEntrada;
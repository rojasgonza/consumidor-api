import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Salida from './Salida';
function Salidas() {


    //state entrada = state, guardarEntraddas = funcion para guardar entradas
    const [salidas, guardarSalidas] = useState([]);

    //QUERY
    const consultarAPI = async () => {
        const salidasConsulta = await clienteAxios.get('/salidas');
        //colocar el resultado en el state
        guardarSalidas(salidasConsulta.data);
    }

    //use effect componentdidmount will mount

    useEffect(() => {
        consultarAPI();
    }, []);

    return (

        <Fragment>
         <div className="container">
            <h2>Salidas</h2>
            <a href='/salidas/nueva' className='btn btn-success'>Nuevo</a>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Tipo gasto</th>
                        <th scope="col">ACCIONES</th>

                    </tr>
                </thead>
                <tbody>
                    {salidas.map(salida => (
                        <Salida
                        key={salida.id}
                        salida={salida} />
                    ))}
                </tbody>
            </table>
            </div>
        </Fragment>
    )
}
export default Salidas;
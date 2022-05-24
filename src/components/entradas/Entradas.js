import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Entrada from './Entrada';
function Entradas() {


    //state entrada = state, guardarEntraddas = funcion para guardar entradas
    const [entradas, guardarEntradas] = useState([]);

    //QUERY
    const consultarAPI = async () => {
        const entradasConsulta = await clienteAxios.get('/entradas');
        //colocar el resultado en el state
        guardarEntradas(entradasConsulta.data);
    }

    //use effect componentdidmount will mount

    useEffect(() => {
        consultarAPI();
    }, []);

    return (

        <Fragment>
         <div className="container">
            <h2>Entradas</h2>
            <a href='/entradas/nueva' className='btn btn-success'>Nuevo</a>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Tipo entrada</th>
                        <th scope="col">ACCIONES</th>

                    </tr>
                </thead>
                <tbody>
                    {entradas.map(entrada => (
                        <Entrada
                        key={entrada.id}
                        entrada={entrada} />
                    ))}
                </tbody>
            </table>
            </div>
        </Fragment>
    )
}
export default Entradas;
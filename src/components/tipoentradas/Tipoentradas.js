import React from 'react';
import TEntrada from './Tipoentrada';
import { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
function Tipoentradas(){
    
 //state entrada = state, guardarEntraddas = funcion para guardar entradas
 const [tipoentradas, guardartEntradas] = useState([]);

 //QUERY
 const consultarAPI = async () => {
    const tentradasConsulta = await clienteAxios.get('/tipoentradas');
    //colocar el resultado en el state
    guardartEntradas(tentradasConsulta.data);}

 //use effect componentdidmount will mount

 useEffect(() => {
    consultarAPI();
}, []);
 return (

     <Fragment>
      <div className="container">
         <h2>Tipo Entradas</h2>
         <a href='/tipoentradas/nueva' className='btn btn-success'>Nuevo</a>
         <table className="table">
             <thead>
                 <tr>
                     <th scope="col">#</th>
                     <th scope="col">Detalle</th>
                     <th scope="col">ACCIONES</th>

                 </tr>
             </thead>
             <tbody>
                 {tipoentradas.map(tipoentrada => (
                     <TEntrada
                     key={tipoentrada.id}
                     tipoentrada={tipoentrada} />
                 ))}
             </tbody>
         </table>
         </div>
     </Fragment>
 )
}
export default Tipoentradas;
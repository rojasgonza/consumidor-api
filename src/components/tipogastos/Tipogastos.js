import React from 'react';
import TGasto from './Tipogasto';
import { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
function Tipogasto(){
    
 //state entrada = state, guardarEntraddas = funcion para guardar entradas
 const [tipogasto, guardartGasto] = useState([]);

 //QUERY
 const consultarAPI = async () => {
    const tgastoConsulta = await clienteAxios.get('/tipogasto');
    //colocar el resultado en el state
    guardartGasto(tgastoConsulta.data);}

 //use effect componentdidmount will mount

 useEffect(() => {
    consultarAPI();
}, []);
 return (

     <Fragment>
      <div className="container">
         <h2>Tipo Salidas</h2>
         <a href='/tipogasto/nueva' className='btn btn-success'>Nuevo</a>
         <table className="table">
             <thead>
                 <tr>
                     <th scope="col">#</th>
                     <th scope="col">Nombre</th>
                     <th scope="col">ACCIONES</th>

                 </tr>
             </thead>
             <tbody>
                 {tipogasto.map(tipogasto => (
                     <TGasto
                     key={tipogasto.id}
                     tipogasto={tipogasto} />
                 ))}
             </tbody>
         </table>
         </div>
     </Fragment>
 )
}
export default Tipogasto;
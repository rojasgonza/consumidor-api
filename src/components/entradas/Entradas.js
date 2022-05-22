import React, {useEffect} from 'react';
import clienteAxios from '../../config/axios';
function Entradas(){

    //QUERY
    const consultarAPI= async () =>{
        const entradasConsulta = await clienteAxios.get('/entradas');
        console.log(entradasConsulta);
    }
    
    //use effect componentdidmount will mount
    
    useEffect(()=>{
        consultarAPI();
    });

    return(
        <h2>Entradas</h2>
    )
}
export default Entradas;
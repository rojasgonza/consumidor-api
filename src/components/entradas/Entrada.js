import React, { Fragment } from 'react';

function Entrada({entrada}){
    const {id, detalle, monto, createdAt, tipoentradaId} = entrada;




    return(
        <tr>
            <th scope="row">{id}</th>
            <th>{detalle}</th>
            <th>${monto}</th>
            <th>{createdAt}</th>
            <th>{tipoentradaId}</th>
            <th>BORRAR | EDITAR</th>

        </tr>
    )
}
export default Entrada;
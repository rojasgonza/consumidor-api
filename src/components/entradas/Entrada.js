import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Entrada({entrada}){
    const {id, detalle, monto, createdAt, tipoentradaId, tipoentrada} = entrada;




    return(
        <tr>
            <th scope="row">{id}</th>
            <th>{detalle}</th>
            <th>${monto}</th>
            <th>{createdAt}</th>
            <th>{tipoentrada.nombre}</th>
            <th><a href={`/entradas/editar/${id}`} className="">editar</a> | EDITAR</th>

        </tr>
    )
}
export default Entrada;
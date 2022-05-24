import React, { Fragment } from 'react';

import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function Salida({salida}){
    const {id, detalle, monto, createdAt, tipogasto} = salida;
    const eliminarSalida= (id) =>{
        Swal.fire({
            title: 'Estas seguro que deseas eliminar?',
            text: "Sí lo haces, no recuperarás el dato!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar ahora!'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/salidas/borrar/${id}`)
                .then(res =>{
                    Swal.fire(
                        'Eliminado!',
                       res.data.mensaje,
                        'success'
                      )
                })
            }
          })

    }



    return(
        <tr>
            <th>{id}</th>
            <th>{detalle}</th>
            <th>${monto}</th>
            <th>{createdAt}</th>
            <th>{tipogasto.nombre}</th>
            <th><a href={`/salidas/editar/${id}`} className="">Editar</a> | <a onClick={()=>eliminarSalida(id)} className="">Borrar</a></th>

        </tr>
    )
}
export default Salida;
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function Entrada({entrada}){
    const {id, detalle, monto, createdAt, tipoentradaId, tipoentrada} = entrada;
    const eliminarEntrada= (id) =>{
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
                clienteAxios.delete(`/entradas/borrar/${id}`)
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
            <th scope="row">{id}</th>
            <th>{detalle}</th>
            <th>${monto}</th>
            <th>{createdAt}</th>
            <th>{tipoentrada.nombre}</th>
            <th><a href={`/entradas/editar/${id}`} className="">Editar</a> | <a onClick={()=>eliminarEntrada(id)} className="">Borrar</a></th>

        </tr>
    )
}
export default Entrada;
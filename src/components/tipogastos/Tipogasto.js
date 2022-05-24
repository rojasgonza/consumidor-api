import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function TGasto({tipogasto}){
    const {id, nombre} = tipogasto;
    const eliminarTGasto= (id) =>{
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
                clienteAxios.delete(`/tipogasto/borrar/${id}`)
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
            <th>{nombre}</th>
            <th><a href={`/tipogastos/editar/${id}`} className="">Editar</a> | <a onClick={()=>eliminarTGasto(id)} className="">Borrar</a></th>

        </tr>
    )
}
export default TGasto;
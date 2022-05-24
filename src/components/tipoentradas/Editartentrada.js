import React, {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import  {withRouter} from 'react-router-dom';



function editarTEntrada(props) {
    const {id} = props.match.params;
    //FORMULARIO
    const [tipoentrada, datosTEntrada] = useState({
        nombre: '',

    });
    //useefect

    const actualizarState = e =>{
        ///almacenar lo que escribe
        datosTEntrada({
            //obtener una copia de lo que va escribiendo
            ...tipoentrada,
            [e.target.name] : e.target.value
        })
    }




    //QUERY
    const consultarAPI = async () => {
        const tentradasConsulta = await clienteAxios.get(`/tipoentradas/${id}`);
        datosTEntrada(tentradasConsulta.data); 
    }

    //use effect componentdidmount will moun
    const editarTEntrada = e => {
        e.preventDefault();
        
        //enviar peticion
        clienteAxios.put(`/tipoentradas/editar/${tipoentrada.id}`, tipoentrada)
        .then(res=>{
            if (res.data.code === 11000) {
               Swal.fire({
                   icon: 'error',
                   title: 'Hubo un error',
                   text: 'Ese mail ya se encuentra registrado'
    
               })
            }else{
    
                    Swal.fire(
                    'Good job!',
                    res.data.mensaje,
                    'success'
                )
            }
    
            //a donde quiero que me reedireccione
            props.history.push('/')
        });
    }
    

    useEffect(() => {
        consultarAPI();
    }, []);
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-sm-6'>
            <form onSubmit={editarTEntrada}>
                <label className='form-label'>Nombre</label>
                <input value={tipoentrada.nombre}
                    onChange={actualizarState} className='form-control' type="text" name="nombre" placeholder='auto'/>
                <button type="submit" className='btn btn-danger mt-3'>Enviar</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default withRouter(editarTEntrada);
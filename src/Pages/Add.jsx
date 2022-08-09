import React from 'react'
import NavBar from '../Componets/NavBar'


const Add = (props) => {
    const {handlerClick,handlerChange,Client}=props
  return (
    <div>
        <NavBar/>
         <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <form  onSubmit={handlerClick}>
                        <input type="date" name="Fecha" id="" placeholder='Fecha' className='form-control' onChange={handlerChange}/>
        
                        <select name="Nombre" id="" className='form-control' onChange={handlerChange}>
                            {
                                Client.map(client=>(
                               
                                       <option value={client.Nombre} key={client._id}>{client.Nombre}</option>
                              
                                   
                                ))
                            }
                           
                          
                        </select>
                        <input type="text" name="Detalle" id="" placeholder='Detalle...' className='form-control' onChange={handlerChange}/>
                        <input type="number" name="Monto" id="" placeholder='Monto o Efectivo #' className='form-control' onChange={handlerChange}/>
                           <button className='btn btn-info mt-2'>Guardar</button>
                    </form>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Add
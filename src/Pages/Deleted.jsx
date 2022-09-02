import React from 'react'
import NavBar from '../Componets/NavBar'


const Deleted = (props) => {
    const {Cajas2,total,Delete}=props

  return (
    <div>
        <NavBar/>
        <h1 className='text-center'>  <i className="fa-solid fa-trash-can m-2"> </i></h1>
       <div className="container">
       <table className="table table-striped mt-4 text-center">
        <thead className='bg-success'>
            <tr>
            <th scope="col">#</th>
             <th scope="col"><i className="fa-solid fa-calendar-check"></i> Fecha</th>
            <th scope="col">Nombre</th>
            

            <th scope="col">Detalle</th>
            <th scope="col">Movimiento: <i className="fa-solid fa-dollar-sign"></i>{total}</th>
            <th scope="col">Action</th>

            

            </tr>
        </thead>
            <tbody>
                {
                    Cajas2.map((caja)=>(
                    caja.estado&&<tr key={caja._id}>
                    <th scope="row">{caja.orden}</th>
                    <th scope="row">{caja.Fecha}</th>
                    <td>{caja.Nombre}</td>
                    <td>{caja.Detalle}</td>
                    <td><i className="fa-solid fa-dollar-sign"></i>{caja.Monto}</td>
                    <td><button className='btn btn-sm btn-danger' onClick={()=>Delete(caja._id)}><i className="fa-solid fa-trash-can m-2"> </i></button></td>
                    </tr>
                    ))
                }
            </tbody>
     </table> 
       
       </div>
  </div>
  )
}

export default Deleted
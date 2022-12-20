import React from 'react'
import NavBar from '../Componets/NavBar'

function Hiden({total,Cajas,turn}) {
  return (
    <>
    <NavBar/>
    <table className="table table-striped mt-4 text-center">
    <thead className='bg-success'>
        <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Detalle</th>
        <th scope="col">Movimiento: <i className="fa-solid fa-dollar-sign"></i>{total}</th>
        <th scope="col"><i className="fa-solid fa-calendar-check"></i> Fecha</th>
        <th scope="col"><i className="fa-solid fa-calendar-check"></i> Acction</th>

        

        
        
        

        </tr>
    </thead>
    <tbody>
      {
        Cajas.map((caja)=>(
          caja.estado===false&&<tr key={caja._id}>
            <td>{caja.Nombre}</td>
            <td>{caja.Detalle}</td>
            <td><i className="fa-solid fa-dollar-sign"></i>{caja.Monto}</td>
          <th scope="row">{caja.Fecha}</th>
          <td><button className='btn btn-info btn-sm' onClick={()=>{turn(caja._id,'/hiden')}}>Hide</button></td>
         
       

             
         
          



         
        </tr>
        ))
      }




        
        
        
    </tbody>
</table> 
    
    </>
  )
}

export default Hiden
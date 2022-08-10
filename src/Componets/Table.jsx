import React from 'react'

const Table = (props) => {
  const {Cajas,createPDF,total}= props
  return (
   <div className="container"> 
      <button onClick={createPDF} className='btn btn-sm btn-info'><i class="fa-solid fa-file-circle-plus"></i></button>
     <div className="div">
        <i class="fa-solid fa-dollar-sign"></i>
     </div>
     <table className="table table-striped mt-4 text-center">
        <thead className='bg-success'>
            <tr>
            <th scope="col">#</th>
             <th scope="col"><i class="fa-solid fa-calendar-check"></i> Fecha</th>
            <th scope="col">Nombre</th>
            <th scope="col">Detalle</th>
            <th scope="col">Movimiento: <i class="fa-solid fa-dollar-sign"></i>{total}</th>
            </tr>
        </thead>
        <tbody>
          {
            Cajas.map((caja)=>(
              caja.estado&&<tr key={caja._id}>
              <th scope="row">{caja.orden}</th>
              <th scope="row">{caja.Fecha}</th>
              <td>{caja.Nombre}</td>
              <td>{caja.Detalle}</td>
              <td><i class="fa-solid fa-dollar-sign"></i>{caja.Monto}</td>


             
            </tr>
            ))
          }




            
            
            
        </tbody>
</table> 
   </div>     
  )
}

export default Table
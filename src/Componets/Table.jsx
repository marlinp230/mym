import React from 'react'

const Table = (props) => {
  const {Cajas,createPDF}= props
  return (
   <div className="container"> 
              <button onClick={createPDF} className='btn btn-sm btn-info'>pdf</button>
     <table className="table table-striped mt-4 text-center">
        <thead className='bg-info'>
            <tr>
            <th scope="col">#</th>
             <th scope="col"> Fecha</th>
            <th scope="col">Nombre</th>
            <th scope="col">Detalle</th>
            <th scope="col">Movimiento</th>
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
              <td>{caja.Monto}</td>


             
            </tr>
            ))
          }




            
            
            
        </tbody>
</table> 
   </div>     
  )
}

export default Table
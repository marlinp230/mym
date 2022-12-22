import React from 'react'

const Table = (props) => {
  const {Cajas,createPDF,total,turn}= props
  return (
   <div className="container"> 
      <button onClick={createPDF} className='btn btn-sm btn-info'><i className="fa-solid fa-file-circle-plus"></i></button>
    
     <table className="table table-striped mt-4 text-center">
        <thead className='bg-success'>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Detalle</th>
            <th scope="col">Movimiento: <i className="fa-solid fa-dollar-sign"></i>{total}</th>
            <th scope="col"><i className="fa-solid fa-calendar-check"></i> Fecha</th>
        
            

            
            
            

            </tr>
        </thead>
        <tbody>
          {
            Cajas.map((caja)=>(
              caja.estado&&<tr key={caja._id} onDoubleClick={()=>{turn(caja._id,'/')}}>
                <td>{caja.Nombre}</td>
                <td>{caja.Detalle}</td>
                <td><i className="fa-solid fa-dollar-sign"></i>{caja.Monto}</td>
              <th scope="row">{caja.Fecha}</th>
             
         
             
           

                 
             
              



             
            </tr>
            ))
          }




            
            
            
        </tbody>
</table> 
   </div>     
  )
}

export default Table
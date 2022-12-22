
import React from 'react'

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Componets/NavBar'



function Hiden({cajafalsaTotal,Cajas,turn, enfalse,cajaF}) {
useEffect(() => {
  enfalse()
  
}, [])
 
  const navigate= useNavigate()

  const totalCaja3=cajaF.reduce((p,c)=>p+c.Monto,0)
  cajaF.sort((a,b)=>b.orden-a.orden)
 
  return (
    <>
    <NavBar/>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <button onClick={enfalse} className="btn btn-info btn-sm">refresh</button>
        </div>
      </div>
    </div>
    <table className="table table-striped mt-4 text-center">
    <thead className='bg-success'>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Detalle</th>
        <th scope="col">Movimiento: <i className="fa-solid fa-dollar-sign"></i>{totalCaja3}</th>
        <th scope="col"><i className="fa-solid fa-calendar-check"></i> Fecha</th>
        <th scope="col"><i className="fa-solid fa-calendar-check"></i> Acction</th>

        

        
        
        

        </tr>
    </thead>
    <tbody>
      {
        cajaF.map((caja,index)=>(
          caja.estado===false&&<tr key={caja._id}>
                <td>{index}</td>
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
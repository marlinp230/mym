import React from 'react'
import NavBar from '../Componets/NavBar'

const Addname = (props) => {
    const {handlerChange,addName,Client}=props
   Client.sort((a,b)=>b.orden-a.orden)
  return (
    <div >
        <NavBar/>
        <div className="container">  
        <div className="row">
              <div className="col-md-4 mt-2">
                     <form  onSubmit={addName}>
                        <input type="date" name="Fecha" id="" placeholder='Fecha' className='form-control' onChange={handlerChange}/>
                        <input type="text" name="Nombre" id="" placeholder='Nombre' className='form-control'onChange={handlerChange} />
                      

                           <button className='btn btn-info mt-2'>Guardar</button>
                     </form>
              </div>
              <div className="col-md-4">
              <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Fecha</th>
      <th scope="col">Nombre</th>
      

     
    </tr>
  </thead>
  <tbody>
       {
        Client.map(client=>(
          <tr key={client._id}>
          <th scope="row">{client.orden}</th>

          <th scope="row">{client.Fecha}</th>
          <th scope="row">{client.Nombre}</th>
        

        </tr>
        ))
       }
   
  </tbody>
</table>
              </div>
        </div>
        </div>
        
    </div>
  )
}

export default Addname
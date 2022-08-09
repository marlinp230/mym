import React from 'react'
import NavBar from '../Componets/NavBar'

import Table from '../Componets/Table'

 
const Home = (props) => {
  const {Cajas,filtrar,createPDF,total}=props
  return (
    <div>
        <NavBar filtrar={filtrar}/>
        <h1 className='text-center mt-2'><i class="fa-solid fa-list-check m-2"></i>Datos</h1>
        <Table Cajas={Cajas} createPDF={createPDF} total={total}/>

    </div>
  )
}

export default Home
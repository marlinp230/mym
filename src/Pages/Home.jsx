import React from 'react'
import NavBar from '../Componets/NavBar'

import Table from '../Componets/Table'

 
const Home = (props) => {
  const {Cajas,filtrar}=props
  return (
    <div>
        <NavBar filtrar={filtrar}/>
        <h1 className='text-center mt-2'>Datos</h1>
        <Table Cajas={Cajas} />

    </div>
  )
}

export default Home
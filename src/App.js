import { useEffect, useState } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Add from './Pages/Add';
import axios from 'axios'
import Swal from 'sweetalert2'


function App() {
  const [Cajas, setCajas] = useState([])
  const [Cajas2, setCajas2] = useState([])

  
  
  const [Data, setData] = useState({
    Fecha:"",
    Nombre:"",
    Detalle:"",
    Monto:0
  })

  useEffect(() => {
    GetDataDB()
  
  }, [])

/// sort
Cajas2.sort((a,b)=>b.orden-a.orden)
  // get dato from db 
const GetDataDB=async()=>{
  const res= await axios.get("https://mym-back.herokuapp.com/v/")
  setCajas(res.data.map(caja=>caja))
  setCajas2(res.data.map(caja=>caja))
  }
// handler click guardar 
  const handlerClick=async(e)=>{
    e.preventDefault()
      const res= await axios.post("http://localhost:4000/v/",Data)
  
      const {message}=res.data
      console.log(message)
      if (res.data) {
        Swal.fire({
          icon: 'success',
          text:message,
          timer:1000
        })
      }else{
        Swal.fire({
          icon: 'error',
          text:message,
          timer:1000
        })

      }
      GetDataDB()
  }
  //llenar campo de objeto
  const handlerChange=(e)=>{
    console.log(e.target)    
      //  setData(...Data,[e.target.name]:e.target.value)
      setData((prev)=>({
        ...prev,[e.target.name]:e.target.value
      }))
      
    }

///filtrar
const filtrar=(busqueda)=>{
  const buscado=Cajas.filter((caja)=>{
   if (busqueda=="") {
       return caja
     }
     if (caja.orden==busqueda) {
      return caja
    }
   if (caja.Nombre.toLowerCase().includes(busqueda.toLowerCase())) {
      return caja
    }
    if (caja.Fecha.toLowerCase().includes(busqueda.toLowerCase())) {
      return caja
    }
    if (caja.Detalle.toLowerCase().includes(busqueda.toLowerCase())) {
      return caja
    }
    
})
  setCajas2(buscado)
  

}
  
  return (
    <div className="App">
       <BrowserRouter>
           <Routes>
              <Route path='/' element={<Home Cajas={Cajas2} filtrar={filtrar}/>}/>
              <Route path='/add' element={<Add 
              Cajas={Cajas} 
              handlerClick={handlerClick} 
              handlerChange={handlerChange} 
              Data={Data} 
              setData={setData}
             
              />}/>

              

           </Routes>
       </BrowserRouter>
    </div>
  );
}       

export default App;

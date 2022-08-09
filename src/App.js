import { useEffect, useState } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Add from './Pages/Add';
import Addname from './Pages/Addname';
import axios from 'axios'
import Swal from 'sweetalert2'
import autotable from "jspdf-autotable"
import jsPDF from "jspdf"


   
function App() {
  const [Cajas, setCajas] = useState([]) 
  const [Cajas2, setCajas2] = useState([])
  const [Client, setClient] = useState([])

  const [Data, setData] = useState({
    Fecha:"",
    Nombre:"",
    Detalle:"",
    Monto:0
  })

  //get Total
const total=Cajas2.reduce((p,c)=>p+c.Monto,0)
//useEffect

  useEffect(() => {
    GetDataDB()
    GetName()
  
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
      const res= await axios.post("https://mym-back.herokuapp.com/v/",Data);
      const {message}=res.data;
      if (res.data.status) {
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
  //add name
  const addName=async(e)=>{
    e.preventDefault()
    console.log(Data.Fecha)
    if (!Data.Fecha) {
      Swal.fire({
        icon: 'error',
        text:'Debe poner una fecha',
        timer:1000
      })
      
    }else if (!Data.Nombre) {
      Swal.fire({
        icon: 'error',
        text:'Debe poner una Nombre',
        timer:1000
      })
      
    }else{
      const res= await axios.post('https://mym-back.herokuapp.com/client',Data)
     const {message}=res.data;
   
     if (res.data.status) {
        Swal.fire({
            icon: 'success',
            text:message,
            timer:1000
         })
         GetName()
    }else{
      Swal.fire({
            icon: 'error',
            text:message,
            timer:1000
        })

    }
    }
     
  }
  // get Name
  const GetName=async()=>{
    const res= await axios.get("https://mym-back.herokuapp.com/client")
    
    setClient(res.data.map((client)=>client))
   
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

  const createPDF=()=>{
    const doc= new jsPDF()
   
    doc.text('MYM',90,10)
 
    autotable(doc,{
    
     
      columns: [
      

             { header: 'Fecha', dataKey: 'Fecha' },
             { header: 'Nombre', dataKey: 'Nombre' },
             { header: 'Detalle', dataKey: 'Nombre' },
             { header: 'Monto', dataKey: 'Monto' },
 

          ],
          body:Cajas2
    })
   
    doc.text("Total:"+total,140,10)  
   doc.save("MYM"+Date.now())
  }

  return (
    <div className="App">
       <BrowserRouter>
           <Routes>
              <Route path='/' element={<Home Cajas={Cajas2} filtrar={filtrar} createPDF={createPDF} total={total}/>}/>
              <Route path='/add' element={<Add 
              Cajas={Cajas} 
              handlerClick={handlerClick} 
              handlerChange={handlerChange} 
              Data={Data} 
              setData={setData}
              Client={Client}
                    
              />}/>
             <Route path='/addname' element={<Addname setData={setData} Data={Data} addName={addName} handlerChange={handlerChange} Client={Client}  />}/>
              

           </Routes>
       </BrowserRouter>
    </div>
  );
}       

export default App;

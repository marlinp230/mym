import { useEffect, useState } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Add from './Pages/Add';
import Addname from './Pages/Addname';
import axios from 'axios'
import Swal from 'sweetalert2'
import autotable from "jspdf-autotable"                     
import jsPDF from "jspdf"
import Deleted from './Pages/Deleted';

import  moment from 'moment';
import OnlyProfile from './Pages/OnlyProfile';

          

                        
function App() {
  const [Cajas, setCajas] = useState([]) 
  const [Cajas2, setCajas2] = useState([])
  const [Client, setClient] = useState([])
  const [Status, setStatus] = useState(true)
  const [Fecha, setFecha] = useState('')
const dates= ()=>{
  return `${moment().format('L')}`
}

        const [Data, setData] = useState({
          Fecha:dates(),
          Nombre:"",
          Detalle:"",
       
          Monto:0
        })
     
          //get Total
        const total=Cajas2.reduce((p,c)=>p+c.Monto,0)
        //useEffect

          useEffect(() => {
            if (Status) {
            GetDataDB()   
            GetName()
          
          }
          return setStatus(false)
          
          }, []) 
                   
        /// sort
        Cajas2.sort((a,b)=>b.orden-a.orden)
         // delete 
         const Delete= async(id)=>{

          const { value: password } = await Swal.fire({
            title: 'Enter your PIN',
            input: 'number',
          
            inputPlaceholder: 'Enter your PIN',
            inputAttributes: {
              maxlength: 10, 
              autocapitalize: 'off',
              autocorrect: 'off'
            }
           
          })    

          // not match
          if (!password==="1234") {
            Swal.fire(`Your PIN not match`)

          }   
          /// number macth
          if (password==="1234") {               
                 
            const res= await axios.delete(`https://mym-back.herokuapp.com/v/${id}`);  
             
            if (res.data.status) {
              Swal.fire(`${res.data.message}`)
              GetDataDB()
            } else{
              Swal.fire(`${res.data.message}`)            

            }   
          }
             console.log(id)
            
             
         }

          // get dato from db 
        const GetDataDB=async()=>{
          const res= await axios.get(`https://mym-back.herokuapp.com/v/`);
          setCajas(res.data.map(caja=>caja))
          setCajas2(res.data.map(caja=>caja))
        
          }

        // handler click guardar 
          const handlerClick=async(e)=>{
              const res= await axios.post("https://mym-back.herokuapp.com/v/",Data);
              const {message}=res.data;
              if (res.data.status) {
                alertDisplay('success',message,1000)
                
              }else{
                alertDisplay('error',message,1000)
                
              }
              GetDataDB()
              e.preventDefault()
          }

 //alert display
 const alertDisplay=(icon,text,timer)=>{
  Swal.fire({
    icon:icon,
    text:text,
    timer:timer
  }) 
}
  //add name
  const addName=async(e)=>{
    e.preventDefault()
    console.log(Data)
    if (!Data.Fecha) {
      alertDisplay('error','Debe poner una fecha1 ',1000)
     
      
    }else if (!Data.Nombre) {
      alertDisplay('error','Debe poner una Nombre',1000)
     
      
    }else{
      // https://mym-back.herokuapp.com
      const res= await axios.post('https://mym-back.herokuapp.com/client/',Data)  
      console.log(res.data)
     const {message}=res.data;
   
     if (res.data.status) {
      alertDisplay('success',message,1000)
       
         GetName()
    }else{
      alertDisplay('error',message,1000)

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
    const event1=e.target.children
      
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
    if (caja.Fecha >=busqueda) { 
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
        doc.text('MMYT',90,10)
        doc.text("Total "+total,155,10) 
    autotable(doc,{
    
     
      columns: [
      

             { header: 'Fecha', dataKey: 'Fecha' },
             { header: 'Nombre', dataKey: 'Nombre' },
             { header: 'Detalle', dataKey: 'Detalle' },
             { header: 'Monto', dataKey: 'Monto' },
 

          ],
          body:Cajas2
    })
   
    
   doc.save("MYM"+"/"+"$"+total+"/"+Date.now())
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
             <Route path='/delete' element={<Deleted Cajas2={Cajas2} filtrar={filtrar} createPDF={createPDF} total={total} Delete={Delete}/>}/>
             <Route path='/profile/:only' element={<OnlyProfile/>} />
              

              
   
           </Routes>
       </BrowserRouter>        
     
    </div>
  );
}       

export default App;

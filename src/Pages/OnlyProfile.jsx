import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import '../css/onlyProfile.css'
const OnlyProfile = ({cajafalsaTotal}) => {
    const onlys = useParams()
   console.log("only"+onlys.onlys)
    const [Lista, setLista] = useState([])
    const [Lista2, setLista2] = useState([])
    const [Total, setTotal] = useState(0)

  

    const enfalse11=()=>{
        
        const resf= Lista.filter(caja=>{
          if(caja.estado===false){
              return caja
          }
    
          
        })
        setLista2(resf)
        console.log(Lista2)
        
        const total=Lista2.reduce((p,c)=>p+c.Monto,0)
        setTotal(total)
    }
 /// sort
 Lista.sort((a,b)=>b.orden-a.orden)
 //total of items

const totalItems= Lista.length
    useEffect(() => { 
        const getDTA = async () => {

            const res = await axios.get(`https://backmym.herokuapp.com/v/profile/${onlys.only}`)
           
            setLista(res.data.map(lista => lista))
        }
        getDTA()
        console.log('1')
        enfalse11()
       

        return()=>{
console.log('2')

       
           
        }
    },[])
 //get Total

    return (
        <>
             <header>
                <div className={Total <0 ?"red":'green'} onClick={enfalse11}>CAJA: ${Total}</div>
                  <div>TotalItems: {totalItems}</div>

               
                   <div>Total: $2000</div>
             </header>
            <div className='container1'>


                <div className="row">
                    {
                        Lista.map((list,index)=>(
                            list.estado===false&&
                     <div className="card" key={list._id}>
                          <div className="subcard">
                             <div className="x">{index+1}</div>
                             <div className="fecha">{list.Fecha}</div>
                             <div className={list.Monto <0 ?"red":'green'}>${list.Monto}</div>
                          </div>
                          <div className="description">{list.Detalle}</div>

                    </div>
                        ))
                    }

{/*




                        Lista.map((caja,index)=>(
                            caja.estado===false&&<tr key={caja._id}>
                                  <td>{index}</td>
                              <td>{caja.Nombre}</td>
                              <td>{caja.Detalle}</td>
                              <td><i className="fa-solid fa-dollar-sign"></i>{caja.Monto}</td>
                            <th scope="row">{caja.Fecha}</th>
                           </tr>
                          ))*/}

                </div>

            </div>

        </>
    )
}


export default OnlyProfile
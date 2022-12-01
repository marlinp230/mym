import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import '../css/onlyProfile.css'
const OnlyProfile = () => {
    const onlys = useParams()
   
    const [Lista, setLista] = useState([])
 /// sort
 Lista.sort((a,b)=>b.orden-a.orden)
 //total of items

const totalItems= Lista.length
    useEffect(() => { 
        const getDTA = async () => {

            const res = await axios.get(`https://mym-back.herokuapp.com/v/profile/${onlys.only}`)
            console.log(res.data)
            setLista(res.data.map(lista => lista))
        }
        getDTA()
    }, [])
 //get Total
 const total=Lista.reduce((p,c)=>p+c.Monto,0)  
    return (
        <>
             <header>
                <div className={total <0 ?"red":'green'}>CAJA: ${total}</div>
                  <div>TotalItems: {totalItems}</div>

               
                   <div>Total: $2000</div>
             </header>
            <div className='container1'>


                <div className="row">
                    {
                        Lista.map(list=>(
                     <div className="card" key={list._id}>
                          <div className="subcard">
                             <div className="x">{list.orden}</div>
                             <div className="fecha">{list.Fecha}</div>
                             <div className={list.Monto <0 ?"red":'green'}>${list.Monto}</div>
                          </div>
                          <div className="description">{list.Detalle}</div>

                    </div>
                        ))
                    }



                </div>

            </div>

        </>
    )
}


export default OnlyProfile
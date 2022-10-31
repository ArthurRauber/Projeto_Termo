import { useState, useEffect } from 'react'
import Linha from './components/Linha'
import './App.css'

import { useContext } from "react";
import { TermoContext } from "./components/context/";

function App() {

  const [termoState, dispatch] = useContext(TermoContext)

  const [count, setCount] = useState([0,1,2,3,4,5])
  const [linha,setLinha] = useState([0,1,2,3,4,5])
  const [habilitada,setHabilitada] = useState(0)

  function setLinhaSetada(){
    dispatch({
      type:'CHANGE_INPUT',
    })
    return false;
  }
  
  return (
      <>
        <h1 className='header'>TERMO</h1>
        <div className='container' id="container">  
            <div className='Linha'>
              {count.map((item)=>{
                {item !== 0 
                  return  <Linha autoFocus disabled={termoState.linha_habilitada === item ? false : true} />
                }
              })}
            </div>
        </div>
      </>
  )
}

export default App

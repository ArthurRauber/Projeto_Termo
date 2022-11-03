import { useState, useEffect } from 'react'
import Linha from './components/Linha'
import './App.css'
import YouWin from './components/YouWin/';
import Welcome from './components/Welcome/';

import { useContext } from "react";
import { TermoContext } from "./components/context/";
let letras = ["cinza","cinza","cinza","cinza","cinza"]
let numletras = [1,1,1,1,1]

let palavras = ['certa','conta','palco','plano','ciano','ratos'];
let random = Math.floor(Math.random()*palavras.length);
let palavraCerta = palavras[random]
function App() {
  const [termoState, dispatch] = useContext(TermoContext)
  
  const [count, setCount] = useState([0,1,2,3,4,5])
  const [linha,setLinha] = useState([0,1,2,3,4,5])
  const [habilitada,setHabilitada] = useState(0)
  const [welcome, setWelcome] = useState(false);
 

  console.log(palavraCerta)
  function setLinhaSetada(){
    dispatch({
      type:'CHANGE_INPUT',
    })
    return false;
  }
  
  return (
      <>
      {termoState.welcome?  
        <Welcome />
      :
      <>
      <h1 
        className='header'
        >TERMO</h1>
        <div className='div-ganhou'>
          {termoState.ganhou && 
            <YouWin/>
          }
        </div>
        <div className='container' id="container">  
            <div className='Linha'>
              {count.map((item)=>{
                let json = localStorage.getItem("linha_h");
                let aux = parseInt(json)
                {item !== 0 
                  return  <Linha autoFocus disabled={aux == item ? false : true} numletras={numletras} palavraCerta={palavraCerta}/>
                }
              })}
            </div>
        </div>
      </>
      }
        
      </>
  )
}

export default App

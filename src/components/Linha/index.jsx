import React from 'react'
import { useState, useEffect } from 'react'

import { useContext } from "react";
import { TermoContext } from "../context/";

import './Input.css'

const Input = ({disabled}) => {

  const [termoState, dispatch] = useContext(TermoContext)

  const [count, setCount] = useState([0,1,2,3,4])
  const [linhaHabilitada, setLinhaHabilitada] = useState(-1);
  const [acertou,setAcertou] = useState(termoState.change);
  const [disabled1, setDisabled1] = useState(disabled)
  let palavra = ["","","","",""]
  let alfabeto = "abcdefghijklmnopqrstuvwxyz";
  let palavraCerta = 'certa'

  let ran = Math.random();

  function mudarPalavra(key,e){
    palavra[key]=e;
    console.log(palavra)
    if(key!==4){
      mudarFoco(key+1)
    }else{
      document.getElementById("container").focus();
    } 
  }
  
  function mudarFoco(key){
    setTimeout(() => {
       document.getElementById((key+1)*ran).focus();
    }, "50")
    
  }

  function verificaPalavra(){
    if(palavra.includes("")){
      alert("A palavra deve ter 5 letras!")
    }
    else{
      if(palavra.join('')==palavraCerta){
        dispatch({
          type:"CHANGE_ENABLED",
      })
  
      }
      else{
        dispatch({
          type:"CHANGE_INPUT"
        })
        console.log(termoState.linha)
      }
    }
  }
  function teclaPressionada(event, item) {
    if(alfabeto.includes(event.key)){
      mudarPalavra(item,event.key)
    }

    else if(event.key==='Enter') verificaPalavra();
    else if(event.key==='ArrowLeft') mudarFoco(item-1)
    else if(event.key==='ArrowRight') mudarFoco(item+1)
    else if((event.key==='Backspace')) {
      if(palavra[item]!==""){
        palavra[item] = "";
      }else{
        mudarFoco(item-1)
      }
      
    }
  }
  useEffect(() => {
    mudarFoco(0);
  });
// tem q ser aq o bgl q colocamo no outro arqv
// pq é cada input q tem q ter id diferente, n cada linha

  return (
    <>
      <div className='linha'>
        {count.map(item=>{
          return (
            <>
            <input 
            type="text"
            onKeyDown={event=>teclaPressionada(event, item)}
            disabled={disabled} 
            className={termoState.change}
            autoFocus 
            style={disabled ? { border:"5px solid #615458", backgroundColor:"#615458"} : ((termoState.change=="acertou") ? {backgroundColor: "#3aa394", border: "5px solid #3aa394"} : {border: "5px #312a2c solid"})
            }
            pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$"
            key={item} id={(item+1)*ran} maxLength={1}></input>
            </>
            )
          })}
        
    </div>
    <div>
    </div>
    </>
  )
}

export default Input
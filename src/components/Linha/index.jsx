import React from 'react'
import { useState, useEffect } from 'react'

import { useContext } from "react";
import { TermoContext } from "../context/";

import YouWin from '../YouWin/';
import styled from "styled-components"

import './Input.css'
const Input = ({disabled, numletras}) => {
  const [termoState, dispatch] = useContext(TermoContext)

  const [count, setCount] = useState([0,1,2,3,4])
  const [linhaHabilitada, setLinhaHabilitada] = useState(-1);
  const [acertou,setAcertou] = useState(termoState.change);
  const [disabled1, setDisabled1] = useState(disabled)

  const [ganhou, setGanhou] = useState(false);

  let palavra = ["","","","",""]
  let alfabeto = "abcdefghijklmnopqrstuvwxyz";
  let palavraCerta = 'certa'

  let ran = Math.random();
  function mudarPalavra(key,e){
    palavra[key]=e;
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
// ------------------------------------------------------------------------------------------------------------------
  function verificaPalavra(){
    if(palavra.includes("")){
      alert("A palavra deve ter 5 letras!")
    }
    else{
      if(palavra.join('')==palavraCerta){
        
        dispatch({
          type:"CHANGE_ENABLED",
      })
      for(let i=0;i<5;i++){
        document.getElementById((i+1)*ran).disabled = true;
      }
      setGanhou(true);
    }
      else{
        let palavraCerta_split = palavraCerta.split('')
        console.log(numletras)
        for(let i=0;i<5;i++){
          if(palavra[i]==palavraCerta_split[i]){
            numletras[i]++;
          }
        //lugar certo
        if(palavra[i]==palavraCerta_split[i]){
          document.getElementById((i+1)*ran).style.backgroundColor = "#3aa394";
          document.getElementById((i+1)*ran).style.border =  '5px solid #3aa394'
        }
        else if(palavraCerta.includes(palavra[i])){
          //lugar errado letra certa
          document.getElementById((i+1)*ran).style.backgroundColor = "#d3ad69";
          document.getElementById((i+1)*ran).style.border = '5px solid #d3ad69';
        }
      }
        dispatch({
          type:"CHANGE_INPUT"
        })
      }
    }
  }
  // ----------------------------------------------------------------------------------------------------------------
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

  return (
    <>
    {ganhou && 
      <YouWin />
    }
      <div className='linha' style={{zIndex: -1}}>
        {count.map(item=>{
          return (
            <>
            <StyledInput
            type="text"
            onKeyDown={event=>teclaPressionada(event, item)}
            disabled={disabled} 
            className={termoState.change}
            autoFocus 
            pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$"
            key={item} id={(item+1)*ran} maxLength={1}/>
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

const StyledInput = styled.input`
  ${props => props.disabled && ({
  border: '5px solid #615458',
  backgroundColor: '#615458',
  })}
`
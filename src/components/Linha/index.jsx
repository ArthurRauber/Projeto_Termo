import React from 'react'
import { useState, useEffect } from 'react'

import { useContext } from "react";
import { TermoContext } from "../context/";

import styled from "styled-components"

import './Input.css'

const Input = ({disabled, numletras,palavraCerta}) => {
  const [termoState, dispatch] = useContext(TermoContext)

  const [count, setCount] = useState([0,1,2,3,4])
  const [linhaHabilitada, setLinhaHabilitada] = useState(-1);
  const [acertou,setAcertou] = useState(termoState.change);
  const [disabled1, setDisabled1] = useState(disabled)

  const [ganhou, setGanhou] = useState(false);

  let palavra = ["","","","",""]
  let alfabeto = "abcdefghijklmnopqrstuvwxyz";
  let letrasExcluidas = [];
  let ran = Math.random();

  function vezesLetraAparece(frase, letra) {
    let resultado = 0;
  
    for (var indiceLetra = 0; indiceLetra < frase.length; indiceLetra++) {
      if (frase[indiceLetra] === letra) {
        resultado++; // Somamos 1 ao contador.
      }
    }
    return resultado;
  }

//   if($(document.getElementById('')).is(":hover"))
  
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
        for(let l=0;l<5;l++){
          document.getElementById((l+1)*ran).disabled = true;
        }
        dispatch({
          type:"CHANGE_ENABLED",
        })
        
        for(let i=5;i>=1;i++){
            document.getElementById((i+1)*ran).style.backgroundColor = "#3aa394";
            document.getElementById((i+1)*ran).style.border =  '5px solid #3aa394';
        }
        dispatch({
            type:"CHANGE_GANHOU",
        }
        )
        }
        else{
            let palavraCerta_split = palavraCerta.split('');
                for(let i=0;i<5;i++){
                //lugar certo
                if(palavra[i]==palavraCerta_split[i]){
                    if((vezesLetraAparece(palavra,palavra[i]))>(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                      letrasExcluidas.push(palavra[i]);
                      console.log(letrasExcluidas);
                    }

                    document.getElementById((i+1)*ran).style.backgroundColor = "#3aa394";
                    document.getElementById((i+1)*ran).style.border =  '5px solid #3aa394';
                }
                else if(palavraCerta.includes(palavra[i]) && (vezesLetraAparece(palavraCerta,palavra)<2)){
                  if((vezesLetraAparece(palavra,palavra[i]))<=(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                      console.log("chegou aq " + palavra[i])
                        //lugar errado letra certa
                        if(!(letrasExcluidas.includes(palavra[i]))){
                            document.getElementById((i+1)*ran).style.backgroundColor = "#615458";
                            document.getElementById((i+1)*ran).style.border = '5px solid #615458';
                        }
                    }
                    else{
                      if((vezesLetraAparece(palavra,palavra[i]))>(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                        if((letrasExcluidas.includes(palavra[i]))){
                            document.getElementById((i+1)*ran).style.backgroundColor = "#615458";
                              document.getElementById((i+1)*ran).style.border = '5px solid #615458';
                        }
                        else{
                          letrasExcluidas.push(palavra[i]);
                          console.log("chegou aq2.0")
                          document.getElementById((i+1)*ran).style.backgroundColor = "#d3ad69";
                          document.getElementById((i+1)*ran).style.border = '5px solid #d3ad69';
                        }
                      }
                    }
                  }
                }
                for(let i=0;i<5;i++){
                    //lugar certo
                    if(palavra[i]==palavraCerta_split[i]){
                        if((vezesLetraAparece(palavra,palavra[i]))>(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                          letrasExcluidas.push(palavra[i]);
                          console.log(letrasExcluidas);
                        }
                        
                        document.getElementById((i+1)*ran).style.backgroundColor = "#3aa394";
                        document.getElementById((i+1)*ran).style.border =  '5px solid #3aa394';
                    }
                    else if(palavraCerta.includes(palavra[i]) && (vezesLetraAparece(palavraCerta,palavra)<2)){
                      if((vezesLetraAparece(palavra,palavra[i]))<=(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                          console.log("chegou aq " + palavra[i])
                            //lugar errado letra certa
                            if(!(letrasExcluidas.includes(palavra[i]))){
                              document.getElementById((i+1)*ran).style.backgroundColor = "#d3ad69";
                              document.getElementById((i+1)*ran).style.border = '5px solid #d3ad69';
                            }
                        }
                        else{
                          if((vezesLetraAparece(palavra,palavra[i]))>(vezesLetraAparece(palavraCerta,palavraCerta_split[i]))){
                            if((letrasExcluidas.includes(palavra[i]))){
                              console.log("tá aq")
                              
                            }
                            else{
                              letrasExcluidas.push(palavra[i]);
                              console.log("chegou aq2.0")
                              document.getElementById((i+1)*ran).style.backgroundColor = "#d3ad69";
                              document.getElementById((i+1)*ran).style.border = '5px solid #d3ad69';
                            }
                          }
                        }
                      }
                    }
            }
            dispatch({
              type:"CHANGE_INPUT"
            })
        }
      }
  // ----------------------------------------------------------------------------------------------------------------
    function teclaPressionada(event, item) {
        if(alfabeto.includes(event.key)){
          document.getElementById((item+1)*ran).value=""
          mudarPalavra(item,event.key);
        }

        else if(event.key==='Enter') {
            verificaPalavra()
        }
        else if(event.key==='ArrowLeft') mudarFoco(item-1)
        else if((event.key==='ArrowRight') || (event.key===' ')) mudarFoco(item+1)
        else if((event.key==='Backspace')) {
            if(palavra[item] != ""){
                palavra[item] = "";
            }else{
                mudarFoco(item-1);              
            }
          }
        
        }
    

    useEffect(() => {
        mudarFoco(0);
    });

    // useEffect(()=>{
    //     for(let i=0;i<5;i++){
    //         let input = document.getElementById((i+1)*ran)
    //         if(input.is(":ac")){

    //         }
    //     }
    // },[count])

    return (
        <>
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

import React from 'react'
import './index.css'

import { useContext } from "react";
import { TermoContext } from "../context/";
function index() {
    const [termoState, dispatch] = useContext(TermoContext)
    function fechar(){
        dispatch({
            type:"CHANGE_WELCOME",
          })
    }
  return (
    <>
        <div className='container--welcome'>
            <h2 style={{paddingTop: '20px'}}>Bem vindo(a) ao Termo</h2>
            <p>Descubra a palavra certa em 6 tentativas. Depois de cada tentativa, as peças mostram o quão perto você esta da solução</p>
            <p>Se a letra estiver <span style={{color: '#3aa394'}}>verde</span>, significa que ela faz parte da palavra e está na posição correta.</p>
            <p>Se a letra estiver <span style={{color: '#d3ad69'}}>amarela</span>, significa que ela faz parte da palavra, mas está na posição errada.</p>
            <p>Se a letra estiver <span style={{color: '#605458'}}>cinza</span>, significa que ela não faz parte da palavra</p>
            <p>Os acentos são preenchidos automaticamente, e não são considerados nas dicas.</p>
            <p>Uma palavra nova aparece toda vez que você recarregar a página</p>
            <p >Bom jogo.</p>
            <p style={{opacity: 0.3}}>Desenvolvido por Arthur Rauber e Juliano Heinle</p>
            <p style={{opacity: 0.3}}>Todos os direitos reservados ao site term.ooo</p>
        </div>
            <button className="fechar" onClick={fechar}>Fechar</button>
    </>
  )
}

export default index

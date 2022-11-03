import { createContext, useReducer } from "react";


const initialState = {
    change: "padrao",
    disable: [[true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]],
    linha_habilitada: 0,
    linha: 0,
    ganhou: false,
    welcome: true,
}

let contador = 0;
const termoReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_ENABLED": {
                let json1 = localStorage.getItem("linha_h");
                let aux1 = parseInt(json1);
                
                return {
                    ...state,
                    disable: [[true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true]],
                    change: "acertou",

                };
            }
            case "CHANGE_ERRADO": {
                return {
                    ...state,
                    change: "errou",
                };
            }
            case "CHANGE_INPUT":{
                
                let json = localStorage.getItem("linha_h");
                let aux = parseInt(json)+1;
                
                console.log(aux);
                localStorage.setItem("linha_h",JSON.stringify(aux));
                aux = parseInt(json)-2;
                return{
                    ...state,
                    change: "errou",
                    linha_habilitada: aux,
                }
              }
              case "CHANGE_GANHOU": {
                return {
                    ...state,
                    ganhou: true,
                };
            }
            case "CHANGE_WELCOME": {
                return {
                    ...state,
                    welcome: false,
                };
            }
        default: 
            return state;
    }
}

export const TermoContext = createContext();

export const TermoProvider = ({ children }) => {
  const value = useReducer(termoReducer, initialState);

  return <TermoContext.Provider value={value}>{children}</TermoContext.Provider>;
};


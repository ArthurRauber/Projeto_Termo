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
}

let contador = 0;
const termoReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_ENABLED": {
                let json1 = localStorage.getItem("linha_h");
                let aux1 = parseInt(json1);
                
                return {
                    ...state,
                    change: "acertou",
                    disable: initialState.disable[aux1]=[true, true, true, true, true],

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
        default: 
            return state;
    }
}

export const TermoContext = createContext();

export const TermoProvider = ({ children }) => {
  const value = useReducer(termoReducer, initialState);

  return <TermoContext.Provider value={value}>{children}</TermoContext.Provider>;
};


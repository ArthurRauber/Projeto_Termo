import { createContext, useReducer } from "react";

const initialState = {
    change: "padrao",
    disable: [[true, true, true, true, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]],
    linha_habilitada: 0,
    linha: 1,
}

let l=-1;
const termoReducer = (state, action) => {
    switch(action.type){
            case "CHANGE_ENABLED": {
                return {
                    ...state,
                    change: "acertou",
                    disable: [[true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true]],
                };
            }
            case "CHANGE_INPUT":{
                if(l==-1){
                    l++;
                }
                console.log(l)
                return{
                    ...state,
                    linha_habilitada: l,
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
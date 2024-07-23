import React from 'react'
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// import 'react-awesome-button/dist/themes/theme-blue.css';

type ItemOpciones = {
  cor:string,
  nome:string
}

type ToolbarProps={
  toolbar:{
    opcoes:ItemOpciones[],
},
  handleAction: (cor: string, nome: string) => void,
  cor:string
}

export const Toolbar:React.FC<ToolbarProps> = (props) => {
  return (
    <div className="box-toolbar clear">
    {props.toolbar.opcoes.map((item)=>{
        let cor = item.cor
        let nome = item.nome

        return <AwesomeButton 
                    type="primary" 
                    key={nome} 
                    className="bt-toolbar"
                    onPress={() => props.handleAction(cor, nome)}
                >
                    {nome}
                </AwesomeButton>
    })}
    </div>
  )
}

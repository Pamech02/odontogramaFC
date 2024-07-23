import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Tabs, Tab, Typography, Theme } from '@material-ui/core';

import Store from './Store/Store'
import Header from './components/Header'
import {Tooth} from './components/Tooth'
import {Toolbar} from './components/Toolbar'

import './App.css';

type TabContainerProps = {
  children: React.ReactNode;
};

const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

const styles = (theme:Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

type Face = {
  id:string,
  nome:string,
  estado:string
}

type ToothData={
  id:number,
  nome:string,
  status:boolean,
  css?:string,
  faces:Face[]
}

type AppProps = {
  classes: {
    root: string;
  };
};

//nose de donde viene classes
const App: React.FC<AppProps> = ({ classes }) => {
  const [state, setState] = useState({ ...Store, value: 0, marked: {selecionado: '', cor: ''} });
 
  // Muda as abas
  const handleChange = (event: React.ChangeEvent<{}>,value:number) => {
    setState(prevState => ({ ...prevState, value }));
  };

  // Muda acao dos de pintura 
  const handleAction = (cor:string, nome:string) => {
    setState(prevState => ({ ...prevState, marked: { selecionado: nome, cor: cor } }));
  };

  // useEffect(() => {
  //   console.log('Estado actualizado:', state);
  // }, [state.marked]);

  // Toogle - adiciona e remove dente
  const toggleTooth = (data:ToothData) => {
    setState(prevState => {
      const updatedInfantil = prevState.arcada.infantil.map(item =>
        item.id === data.id ? { ...item, status: !item.status } : item
      );
      const updatedAdulto = prevState.arcada.adulto.map(item =>
        item.id === data.id ? { ...item, status: !item.status } : item
      );
      return {
        ...prevState,
        arcada: {
          infantil: updatedInfantil,
          adulto: updatedAdulto
        }
      };
    });
  };

  // Pinta face
  const setFace = (face:string, index:number, data:ToothData) => {
    const acao = state.marked.cor;
    const updatedData = {
      ...data,
      faces: data.faces.map((f:Face, i:number) =>
        i === index ? { ...f, estado: acao === f.estado ? 'white' : acao } : f
      )
    };

    setState(prevState => ({
      ...prevState,
      arcada: {
        infantil: prevState.arcada.infantil.map(d => d.id === data.id ? updatedData : d),
        adulto: prevState.arcada.adulto.map(d => d.id === data.id ? updatedData : d)
      }
    }));
  };

  const { value } = state;

  return (
    <div className="container">
      <Header />
      <main>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Adulto" />
              <Tab label="Infantil" />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              {state.arcada.adulto.map((item, index) => (
                <Tooth
                  key={item.id}
                  index={index}
                  data={item}
                  toggleTooth={toggleTooth}
                  setFace={setFace}
                />
              ))}
            </TabContainer>
          )}

          {value === 1 && (
            <TabContainer>
              {state.arcada.infantil.map((item, index) => (
                <Tooth
                  key={item.id}
                  index={index}
                  data={item}
                  toggleTooth={toggleTooth}
                  setFace={setFace}
                />
              ))}
            </TabContainer>
          )}
        </div>
        <Toolbar toolbar={state.toolbar} handleAction={handleAction} cor={state.marked.cor} />
      </main>
    </div>
  );
};

export default withStyles(styles)(App);


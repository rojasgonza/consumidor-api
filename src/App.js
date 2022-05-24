import Header from './components/layout/Header';
import './App.css';
import React, { Fragment } from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Tipogastos from './components/tipogastos/Tipogastos';
import Tipoentradas from './components/tipoentradas/Tipoentradas';
import Salidas from './components/salidas/Salidas';
import Entradas from './components/entradas/Entradas';
import nuevaEntrada from './components/entradas/Nuevaentrada';
import editarEntrada from './components/entradas/Editarentrada';
import Nuevotentrada from './components/tipoentradas/Nuevotentrada';
function App() {
  return (
    <BrowserRouter>  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/tipogastos" component={Tipogastos}/>
        <Route exact path="/tipoentradas" component={Tipoentradas}/>
        <Route exact path="/salidas" component={Salidas}/>
        <Route exact path="/entradas" component={Entradas}/>
        <Route exact path="/entradas/nueva" component={nuevaEntrada}/>
        <Route exact path="/entradas/" component={nuevaEntrada}/>
        <Route exact path="/entradas/editar/:id" component={editarEntrada}/>
        <Route exact path="/tipoentradas/nueva" component={Nuevotentrada}/>

       
    
      </Switch>
    </Fragment>
  </Router>
  </BrowserRouter>

  );
}

export default App;

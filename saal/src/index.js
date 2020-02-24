import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import { BrowserRouter, Route } from "react-router-dom";

//element where we'll mount our react app
const rootElement = document.getElementById("root");

const App = () => (
  // making our redux store available to nested components. 
  <BrowserRouter>
  <Provider  store={store}>
    <Route exact path="/" component={Menu} />
  </Provider>
  </BrowserRouter>
)

//we render our app over rootElement
ReactDOM.render(<App/>,rootElement);
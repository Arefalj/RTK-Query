import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react"; 
import { productsApi } from "./redux/apis"; 
import { store } from "./redux/store"; 
import { Provider } from "react-redux";
import Data from "./components/Data"; 
import Post from "./components/Post"; 

function App() {
  return (
    <Provider store={store}> 
        <div className="app">
          <Data />
          <Post />
        </div>
    </Provider>
  );
}

export default App;

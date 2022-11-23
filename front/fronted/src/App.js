import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React, { useEffect, useState } from 'react';


import Header from './components/Header';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import AddBoard from './components/board/AddBoard';
import DetailBoard from './components/board/DetailBoard';

function App() {

  return (
    <div className="App">


      <BrowserRouter>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={ <MainPage /> } />
          <Route path="signin" element={ <Signin /> } />
          <Route path="signup" element={ <Signup /> } />
          <Route path="addBoard" element={ <AddBoard />} />
          <Route path="detailBoard" element={ <DetailBoard /> } />

          <Route path="*" element={ <NotFound /> } />

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Play from './components/Play';
import Result from './components/Result';
import Top from './components/Top';
import Header from './components/Header'

function App() {
  return (
    <>
    <Header></Header>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Top/>} />
        <Route path='/play' element={<Play/>} />
        <Route path='/result' element={<Result/>} />
        {/* <Link to='/'>Back To Top</Link> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
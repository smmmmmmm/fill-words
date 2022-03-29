import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Play from './components/Play';
import Result from './components/Result';
import Top from './components/Top';
// import Result from './components/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Top/>} />
        <Route path='/play' element={<Play/>} />
        <Route path='/result' element={<Result/>} />
        {/* <Link to='/'>Back To Top</Link> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

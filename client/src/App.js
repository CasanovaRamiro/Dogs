import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";

import Home from "./components/Home";

import DogDetail from './components/DogDetail'

import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
          <Route  path="/" element={<LandingPage/>} />

          <Route  path="/home" element={<Home/>} />

          <Route  path='/dog/:id' element={<DogDetail/>} />

          <Route  path='/form' element={<Form/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

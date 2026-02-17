import '../App.css'
import { Routes, Route } from "react-router-dom";

import LoginForm from './LoginForm';
import Population from './Population';
import BarChart from './BarChart';

import Header from './Header';
import Footer from './Footer';

function App() {

  return (
    <>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path='/population' element={<Population/>}/>
          <Route path='/barchart' element={<BarChart/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App;

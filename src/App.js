import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./Component/Home"
import Edit from './Component/Edit';
function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Table/:company_id' element={<Edit/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position='top-center' />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/addUser' element={<AddEdit/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

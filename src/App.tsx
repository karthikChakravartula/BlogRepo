import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/Navbar';
import { CreatePost } from './pages/create-post/createpost';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar/>
         <Routes>
             <Route path='/' element={<Main/>}></Route>
             <Route path='/login' element={<Login/>}></Route>
             <Route path='/create-post/createpost' element={<CreatePost/>}></Route>
         </Routes>
      </Router>
    </div>
  );
}

export default App;

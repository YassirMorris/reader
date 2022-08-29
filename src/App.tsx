import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Disclaimer from './pages/Disclaimer/Disclaimer';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/disclaimer' element={<Disclaimer/>}/>
      </Routes>
    </div>
  );
}

export default App;

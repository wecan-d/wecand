import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandPage from './pages/LandPage';
import MyPage from './pages/MyPage';
import RegisterPage1 from './pages/RegisterPage1';
import RegisterPage2 from './pages/RegisterPage2';
import RegisterPage3 from './pages/RegisterPage3';
import RegisterPage4 from './pages/RegisterPage4';
import WelcomePage from './pages/WelcomePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/register/1" element={<RegisterPage1/>}/>
      <Route path="/register/2" element={<RegisterPage2/>}/>
      <Route path="/register/3" element={<RegisterPage3/>}/>
      <Route path="/register/4" element={<RegisterPage4/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/land" element={<LandPage/>}/>
      <Route path="/mypage" element={<MyPage/>}/>
    </Routes>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Register from 'src/pages/Register';
import Login from 'src/pages/Login';
import Home from './pages/Home';

export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    );
}

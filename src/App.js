import { Button } from 'react-bootstrap';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="wrapper">
      <Layout>
        <Routes>
          <Route path="/" element={<Login />}> </Route>
        </Routes>
        <Routes>
          <Route path="register" element={<Register />}> </Route>
        </Routes>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}> </Route>
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;

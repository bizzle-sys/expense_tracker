import { Button } from 'react-bootstrap';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="wrapper">
      <Login />
      <Register />
      <Dashboard />
    </div>
  );
}

export default App;

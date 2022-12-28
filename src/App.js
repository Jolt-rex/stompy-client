import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Bugs from './pages/Bugs';
import LoginForm from './pages/LoginForm';
import Logout from './pages/Logout';
import NoPage from './pages/NoPage';
import auth from './services/authService';

function App() {
  const [user, setUser] = useState(auth.getCurrentUser());

  const onLogin = () => {
    const updatedUser = auth.getCurrentUser();
    setUser(updatedUser);
  };

  const onLogout = () => {
    auth.logout();
    setUser(null);
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="projects" element={<Projects />} />
          <Route path="bugs" element={<Bugs />} />
          <Route path="login" element={<LoginForm setUser={setUser} />} />
          <Route path="logout" element={<Logout onLogout={onLogout} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

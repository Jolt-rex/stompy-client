
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

const Layout = ({ user, onLogin }) => {
  return ( 
    <>
      <NavBar user={user} onLogin={onLogin} />
      <Outlet />
    </>
   );
}
 
export default Layout;
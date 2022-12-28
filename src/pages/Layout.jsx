
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

const Layout = ({ user }) => {
  return ( 
    <>
      <NavBar user={user} />
      <Outlet />
    </>
   );
}
 
export default Layout;
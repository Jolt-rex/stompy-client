import { useEffect } from 'react';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    console.log('Calling useEffect in Logout');
    onLogout();
    window.location = '/';
  }, [onLogout])

  return null;
}
 
export default Logout;

const Dashboard = ({ user }) => {
  return ( 
    <>
      <h1>Dashboard</h1>
      { user && <p>Logged in as {user.username}</p> }
    </>
   );
}
 
export default Dashboard;
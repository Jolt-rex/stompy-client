import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ user }) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light" >
      <Container>
        <Navbar.Brand as={Link} to="/" >Stompy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="bugs">Bugs</Nav.Link>
          </Nav>
          <Nav>
            {user ? <Navbar.Brand>{user.username}</Navbar.Brand> :
              <Nav.Link as={Link} to="login">Login</Nav.Link>}
            {user ? <Nav.Link as={Link} to="logout">Logout</Nav.Link> :
              <Nav.Link as={Link} to="register" eventKey={2} >Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
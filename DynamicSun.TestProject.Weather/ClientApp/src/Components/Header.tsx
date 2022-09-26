import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';

interface IHeader {
  className: string;
}

const Header = (props: IHeader) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg" className={props.className}>
      <Navbar.Brand>DynamicSun</Navbar.Brand>
      <Nav>
        <Nav.Link onClick={() => navigate('/')}>Главная</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;

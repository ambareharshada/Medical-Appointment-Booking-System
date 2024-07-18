// import NavbarComponent from "./Navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
const Home = () => {
    return (
      <>
        {/* <NavbarComponent /> */}
        {/* <h2>Hello</h2> */}
        <Container className="text-center mt-5">
        <Row>
          <Col>
            <h1>Welcome to the Healthcare System</h1>
            <p>Your health, our priority.</p>
            <Button href="/login" variant="primary" className="m-2 btn-button">
              Login
            </Button>
            <Button href="/register"className="m-2 btn-button">
              Register
            </Button>
          </Col>
        </Row>
      </Container>
      </>
    );
  };
  export default Home;
  
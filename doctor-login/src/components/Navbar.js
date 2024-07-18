import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import logoImage from "../assets/health-care-logo-new1.jpg";

const NavbarComponent = ({ user, onLogout }) => {
  const styleLink = {
    color: "white",
  };

  return (
    <>
      <div style={{ display: "block", width: "100%", padding: 0 }}>
        <Navbar className="navbar-custom">
          {/* bg="light" variant="light" */}
          <Navbar.Brand href="Home">
            <img
              src={logoImage}
              alt="Sample Brand Logo"
              width="50"
              className="align-top d-inline-block"
              height="35"
              style={{ borderRadius: "30%", marginRight: "10px" ,color:"#2b7a78"}}
            />
            HealthCare
          </Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/doctor-login" style={styleLink}>
              Doctor Login
            </Nav.Link>
            <Nav.Link as={Link} to="/doctor-registration" style={styleLink}>
              Doctor Registration
            </Nav.Link>
            <Nav.Link as={Link} to="/patient-login" style={styleLink}>
              Patient Login
            </Nav.Link>
            <Nav.Link as={Link} to="/patient-registration" style={styleLink}>
              Patient Registration
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            {user ? (
              <div>
                <Navbar.Text className="mr-3">Logged in as: <strong> {user} </strong></Navbar.Text>
                <Button className="mr-3 btn-button" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/" className="mr-3 outlined">
                Login
              </Nav.Link>
            )}
          </Form>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarComponent;

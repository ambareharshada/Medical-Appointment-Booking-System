import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import loginImage from "../assets/photo-doctor.jpg";
import { useNavigate } from "react-router-dom";

const DoctorLogin = ({ setUser }) => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    let payload = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:4000/api/doctor/loginDoctor", payload)
      .then((response) => {
        setUser(response.data.doctorDetails.name);
        navigate("/doctor-dashboard");
        localStorage.setItem(
          "doctorDetails",
          JSON.stringify(response.data.doctorDetails)
        );
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
        // message.error('Registration failed!');
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-left mt-5">
          <Col xs={12} md={6} lg={6} className="mt-4">
            <Card className="mt-5">
              <Row noGutters>
              <Col md={4}>
                  <img
                    src={loginImage}
                    alt="Login"
                    className="img-fluid"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title className="text-left">Doctor Login</Card.Title>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Invalid email address";
                        }
                        if (!values.password) {
                          errors.password = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //   console.log(values);
                        //   setSubmitting(false);
                        // }, 4000);
                        handleSubmit(values);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Enter your Email"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Field
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="btn-button"
                            disabled={isSubmitting}
                            block
                          >
                            Login
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Card.Body>
                </Col>
               
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    
    </>
  );
};
export default DoctorLogin;

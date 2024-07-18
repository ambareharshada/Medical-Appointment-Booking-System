import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import loginImage from '../assets/photo-doctor.jpg';

const PatientLogin = ({ setUser }) => {
  const navigate = useNavigate();

  // code to submit login credentials
  const handleSubmit = (values) => {
    let payload = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:4000/api/patient/loginPatient", payload)
      .then((response) => {
        setUser(response.data.patientDetails.name);
        navigate("/patient-dashboard");
        localStorage.setItem(
          "patientDetails",
          JSON.stringify(response.data.patientDetails)
        );
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
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
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title className="text-left">Patient Login</Card.Title>
                  <Formik
                    initialValues={{
                      email: "",
                      password: ""
                    }}
                    validate ={(values) => {
                      console.log("validation schema = ",values);
                      const errors = {};
                       // Validate email
                       if (!values.email || undefined) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
  
                      // Validate password
                      if (!values.password || undefined) {
                        errors.password = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                     
                      handleSubmit(values);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="form-group">
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            className="form-control mb-3"
                          />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password:</label>
                          <Field
                            type="password"
                            name="password"
                            className="form-control mb-3"
                            placeholder="Enter Password"
                          />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <Button type="submit" className="btn-button" >
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
export default PatientLogin;

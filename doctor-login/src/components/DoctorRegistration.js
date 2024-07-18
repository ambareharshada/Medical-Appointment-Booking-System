import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const handleSubmit = (values) => {
    console.log(values);
    let payload = {
      name: values.doctorName,
      phoneNumber: values.phoneNumber,
      age: values.age,
      email: values.email,
      password: values.password,
      address: values.address,
      city: values.city,
      specialist: values.specialist,
    };

    axios
      .post("http://localhost:4000/api/doctor/addDoctor", payload)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          setModalMessage("Doctor created successfully!");
          setDeleteModal(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
        // message.error('Registration failed!');
      });
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title className="text-center">
                  Doctor Registration
                </Card.Title>
                <Formik
                  initialValues={{
                    doctorName: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                    age: "",
                    address: "",
                    city: "",
                    specialist: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.doctorName) {
                      errors.doctorName = "Doctor Name is required";
                    }

                    if (!values.email) {
                      errors.email = "Email is required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }

                    if (!values.password) {
                      errors.password = "Password is required";
                    } else if (values.password.length < 6) {
                      errors.password =
                        "Password must be at least 6 characters";
                    }

                    if (!values.phoneNumber) {
                      errors.phoneNumber = "Phone Number is required";
                    } else if (!/^[0-9]+$/.test(values.phoneNumber)) {
                      errors.phoneNumber = "Phone Number must be only digits";
                    }

                    if (!values.age) {
                      errors.age = "Age is required";
                    } else if (values.age < 1 || values.age > 120) {
                      errors.age = "Age must be between 1 and 120";
                    }

                    if (!values.address) {
                      errors.address = "Address is required";
                    }

                    if (!values.city) {
                      errors.city = "City is required";
                    }

                    if (!values.specialist) {
                      errors.specialist = "Specialist is required";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //   console.log(values);
                    //   alert(JSON.stringify(values, null, 2));
                    //   setSubmitting(false);
                    // }, 4000);
                    handleSubmit(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="form-group">
                      <div className="form-group">
                        <label htmlFor="doctorName">Doctor Name:</label>
                        <Field
                          type="text"
                          name="doctorName"
                          placeholder="Enter Doctor Name"
                          className="form-control mb-3"
                        />
                        <ErrorMessage
                          name="doctorName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Enter Phone Number"
                          className="form-control mb-3"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <Field
                          type="number"
                          name="age"
                          placeholder="Enter age"
                          className="form-control mb-3"
                        />
                        <ErrorMessage
                          name="age"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                          className="form-control mb-3"
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
                          className="form-control mb-3"
                          placeholder="Enter Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                          className="form-control mb-3"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <Field
                          type="text"
                          name="city"
                          placeholder="Enter City"
                          className="form-control mb-3"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="specialist">Specialist:</label>
                        <Field
                          type="text"
                          name="specialist"
                          placeholder="Enter Specialist"
                          className="form-control mb-3"
                        />
                        <ErrorMessage
                          name="specialist"
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
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for message */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-button"
            onClick={() => {
              setDeleteModal(false);
              navigate("/doctor-login");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Formik
          initialValues={{doctorName:"",email:"",password:""}}
          validate={(values) => {
            const errors = {};
            if (!values.doctorName) {
              errors.doctorName = "Required";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 4000);
            handleSubmit(values);
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form class="form-group">
                <label for="doctorName">Doctor Name:</label>
                <Field
                  type="text"
                  name="doctorName"
                  placeholder="Enter Doctor Name"
                  class="form-control mb-3"
                />
                <ErrorMessage name="doctorName" component="div" />

                <label for="phoneNumber">Phone Number:</label>
                <Field
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  class="form-control mb-3"
                />

                <label for="age">Age:</label>
                <Field
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  class="form-control mb-3"
                />
                <ErrorMessage name="age" component="div" />

                <label for="email">Email:</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  class="form-control mb-3"
                />
                <ErrorMessage name="email" component="div" />

                <label for="password">Password:</label>
                <Field
                  type="password"
                  name="password"
                  class="form-control mb-3"
                  placeholder="Enter Password"
                />
                <ErrorMessage name="password" component="div" />

                <label for="address">Address:</label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  class="form-control mb-3"
                />
                <ErrorMessage name="address" component="div" />

                <label for="address">City:</label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  class="form-control mb-3"
                />
                <ErrorMessage name="city" component="div" />

                <label for="address">Specialist:</label>
                <Field
                  type="text"
                  name="specialist"
                  placeholder="Enter Specialist"
                  class="form-control mb-3"
                />
                <ErrorMessage name="specialist" component="div" />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik> */}
    </>
  );
};
export default DoctorRegistration;

// import "./App.css";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const handleSubmit = (values) => {

    let payload = {
      name: values.patientName,
      age: values.age,
      bloodGroup: values.bloodGroup,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      address: values.address,
      gender: values.gender,
    };

    axios
      .post("http://localhost:4000/api/patient/addPatient", payload)
      .then((response) => {
        if (response.status === 200) {
          setModalMessage("Patient created successfully!");
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
                  Patient Registration
                </Card.Title>
                <Formik
                  initialValues={{
                    patientName: "",
                    phoneNumber: "",
                    gender: "male",
                    dateOfBirth: "",
                    age: "",
                    bloodGroup: "",
                    email: "",
                    password: "",
                    address: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    // Validate patientName
                    if (!values.patientName) {
                      errors.patientName = "Required";
                    }

                    // Validate phoneNumber
                    if (!values.phoneNumber) {
                      errors.phoneNumber = "Required";
                    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
                      errors.phoneNumber =
                        "Invalid phone number, must be 10 digits";
                    }

                    // Validate dateOfBirth
                    if (!values.dateOfBirth) {
                      errors.dateOfBirth = "Required";
                    }

                    // Validate age
                    if (!values.age) {
                      errors.age = "Required";
                    } else if (values.age <= 0) {
                      errors.age = "Invalid age";
                    }

                    // Validate bloodGroup
                    if (!values.bloodGroup) {
                      errors.bloodGroup = "Required";
                    } else if (!/^(A|B|AB|O)[+-]$/i.test(values.bloodGroup)) {
                      errors.bloodGroup = "Invalid blood group";
                    }

                    // Validate email
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }

                    // Validate password
                    if (!values.password) {
                      errors.password = "Required";
                    }

                    // Validate address
                    if (!values.address) {
                      errors.address = "Required";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="patientName">Patient Name:</label>
                        <Field
                          type="text"
                          name="patientName"
                          placeholder="Enter patient name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="patientName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter phone number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <Field
                          as="select"
                          name="gender"
                          className="form-control"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Field>
                      </div>

                      <div className="form-group">
                        <label htmlFor="dateOfBirth">Date Of Birth:</label>
                        <Field
                          type="date"
                          name="dateOfBirth"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <Field
                          type="number"
                          name="age"
                          placeholder="Enter age"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="age"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group:</label>
                        <Field
                          type="text"
                          name="bloodGroup"
                          placeholder="Enter blood group"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="bloodGroup"
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
                          placeholder="Enter password"
                          className="form-control"
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
                          placeholder="Enter address"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="address"
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
      ;
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            // variant="primary"
            className="btn-button"
            onClick={() => {
              setDeleteModal(false);
              navigate("/patient-login");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PatientRegistration;

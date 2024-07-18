/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import moment from "moment";

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [doctorNames, setDoctorNames] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateAppointment = (values) => {
    const patientId = JSON.parse(localStorage.getItem("patientDetails"));
    console.log("handleCreateAppointment", values);
    let finalData = {
      doctorId: values.doctorName,
      patientId: patientId._id,
      appointmentDateTime: values.appointmentDate,
    };

    axios
      .post("http://localhost:4000/api/appointment/addAppointment", finalData)
      .then((response) => {
        handleClose();
        setPatientData([...patientData, response.data]);
        if (response.status === 200) {
          setModalMessage("Appointment created successfully!");
          setDeleteModal(true);
        }
        fetchDoctorData.current();
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
        // message.error('Registration failed!');
      });
  };

  const deletePatientRecord = (value) => {
    axios
      .delete(`http://localhost:4000/api/deletePatientId/${value._id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setModalMessage("Appointment deleted successfully!");
          setDeleteModal(true);
        }
        fetchData.current();
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
        // message.error('Registration failed!');
      });
  };

  // use effect to get logged in patients appointments only
  const fetchData = useRef(async () => {
    const patientId = JSON.parse(localStorage.getItem("patientDetails"));
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getAppointmentByPatientId/?patientId=${patientId._id}`
      );
      setPatientData(response.data);
      fetchDoctorData.current();
    } catch (error) {
      setError(error);
    }
  });

  useEffect(() => {
    fetchData.current();
  }, [fetchData]);

  // use effect for get all doctors data
  const fetchDoctorData = useRef(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getAllDoctor`
      );
      setDoctorNames(response.data);
    } catch (error) {
      setError(error);
    }
  });

  useEffect(() => {
    fetchDoctorData.current();
  }, [fetchDoctorData]);

  useEffect(() => {
    const mergedData = patientData.map((patient) => {
      const doctor = doctorNames.find((doc) => doc._id === patient.doctorId);
      return {
        ...patient,
        doctorName: doctor ? doctor.name : "Unknown",
      };
    });

    setPatientData(mergedData);
  }, [doctorNames]);

  return (
    <>
      <div className="container">
        {/* <h3 style={{ textAlign: "center", marginTop: "15px" }}>
          Patient Dashboard
        </h3> */}
        <Card.Title className="text-center display-5">
          Patient Dashboard
        </Card.Title>

        <div className="row align-items-center">
          <div className="col-sm-2">
            <Button className="btn-button" onClick={handleShow}>
              New Appointment
            </Button>
          </div>
          <div className="col"></div>
        </div>
        <div className="row align-items-center">
          <table className="table table-hover table-bordered mt-3 pt-3">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Appointment Date Time</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.doctorName}</td>
                    <td>
                      {moment(val.appointmentDateTime).format("YYYY-MM-DD")}
                    </td>
                    <td>{val.status}</td>
                    <td>
                      <a
                        className="link-a"
                        href="#"
                        onClick={() => {
                          deletePatientRecord(val);
                        }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* <!-- Modal --> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            <Card.Title className="text-center">New Appointment</Card.Title>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ appointmentDate: "", doctorName: "" }}
              validate={(values) => {}}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 4000);
                handleCreateAppointment(values);
              }}
            >
              {({ isSubmitting }) => {
                return (
                  <Form className="form-group">
                    <label for="doctorName">Doctor Name:</label>
                    <Field
                      as="select"
                      name="doctorName"
                      className="form-control mb-3"
                    >
                      <option value="" label="Select option" />
                      {doctorNames.map((option) => (
                        <option
                          key={option._id}
                          value={option._id}
                          label={option.name}
                        />
                      ))}
                    </Field>

                    <ErrorMessage name="doctorName" component="div" />

                    <label for="appointmentDate">Appointment Date:</label>
                    <Field
                      type="date"
                      name="appointmentDate"
                      className="form-control mb-3"
                      placeholder="Select Date"
                    />
                    <ErrorMessage name="appointmentDate" component="div" />

                    <button
                      type="submit"
                      className="float-right btn btn-primary btn-button"
                    >
                      Create Appointment
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Body>
        </Modal>

        {/* Modal for message */}
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              className="float-right btn-button"
              onClick={() => setDeleteModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default PatientDashboard;

import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import CustomTable from "../reusable-components/Table";

const DoctorDashboard = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [patientNames, setPatientNames] = useState([]);
  const [statusId, setStatusId] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setShow(true);
    setStatusId(val._id);
  };

  const handleStatusChange = (values) => {
    const doctorId = JSON.parse(localStorage.getItem("doctorDetails"));

    let finalData = {
      status: values.status,
      _id: statusId,
    };

    axios
      .put("http://localhost:4000/api/getAppointmentByStatusChange", finalData)
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          setAppointmentsData([...appointmentsData, response.data]);
          setModalMessage("Appointment status changed successfully!");
          setDeleteModal(true);
        }
        fetchAppointmentByDoctorIdData.current();
      })
      .catch((error) => {
        console.error("There was an error!", error.message);
      });
  };

  // use effect to get logged in doctors appointments only
  const fetchAppointmentByDoctorIdData = useRef(async () => {
    const doctorId = JSON.parse(localStorage.getItem("doctorDetails"));
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getAppointmentByDoctorId/?doctorId=${doctorId._id}`
      );
      setAppointmentsData(response.data);
      fetchPatientsData.current();
    } catch (error) {
      console.error(
        "There was an error for getAppointmentByDoctorId!",
        error.message
      );
    }
  });

  useEffect(() => {
    fetchAppointmentByDoctorIdData.current();
  }, [fetchAppointmentByDoctorIdData]);

  // use effect for get all doctors data
  const fetchPatientsData = useRef(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/patients`);
      setPatientNames(response.data);
    } catch (error) {
      console.error("There was an error for get all patients!", error.message);
    }
  });

  useEffect(() => {
    fetchPatientsData.current();
  }, []);

  useEffect(() => {
    const mergedData = appointmentsData.map((patient) => {
      const patientsData = patientNames.find(
        (p) => p._id === patient.patientId
      );
      return {
        ...patient,
        patientName: patientsData ? patientsData.name : "Unknown",
      };
    });
    setAppointmentsData(mergedData);
  }, [patientNames]);

  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 28 ,status:"Pending"},
      { id: 2, name: 'Jane Smith', age: 32 ,status:"Pending"},
      { id: 3, name: 'Jane Smith', age: 12 ,status:"Pending"},
      { id: 4, name: 'Jane Smith', age: 37 ,status:"Pending"},
      { id: 5, name: 'Jane Smith', age: 25 ,status:"Pending"},
      { id: 6, name: 'Jane Smith', age: 87 ,status:"Pending"},
      { id: 7, name: 'Jane Smith', age: 98 ,status:"Pending"},
      { id: 8, name: 'Jane Smith', age: 69 ,status:"Pending"},
      { id: 9, name: 'Jane Smith', age: 41 ,status:"Pending"},
      { id: 10, name: 'Jane Smith', age: 41 ,status:"Pending"},
      { id: 11, name: 'Jane Smith', age: 41 ,status:"Pending"},
      { id: 12, name: 'Jane Smith', age: 41 ,status:"Pending"},
      { id: 13, name: 'Jane Smith', age: 41 ,status:"Pending"},
      // Additional data rows...
    ]
  );
  const columns = React.useMemo(
    () => [
      { Header: 'Sr. No.', accessor: 'id' },
      { Header: 'Patient Name', accessor: 'name' },
      { Header: 'Appointment Date', accessor: 'age' },
      { Header: 'Status', accessor: 'status' },
    ],
    []
  );


  return (
    <>
      <div className="container">
        <h3 style={{ textAlign: "center", marginTop: "15px" }}></h3>
        <Card.Title className="text-center display-5">
          Doctor Dashboard
        </Card.Title>
        {/* <div class="row align-items-center">
          <div class="col"></div>
        </div>
        <div class="row align-items-center">
          <table class="table table-hover table-bordered mt-3 pt-3">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Appointment Date Time</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.patientName}</td>
                    <td>
                      {moment(val.appointmentDateTime).format("YYYY-MM-DD")}
                    </td>
                    <td>{val.status}</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-primary btn-button"
                        onClick={() => {
                          handleShow(val);
                        }}
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        <CustomTable columns={columns} data={data} />

        {/* <!-- Modal --> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <Card.Title className="text-center">
                Change Appointment Status
              </Card.Title>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ status: "" }}
              validate={(values) => {}}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 4000);
                handleStatusChange(values);
              }}
            >
              {({ isSubmitting }) => {
                return (
                  <Form className="form-group">
                    <label for="status">Status:</label>
                    <Field
                      as="select"
                      name="status"
                      className="form-control mb-3"
                    >
                      <option value="" label="Select option" />
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </Field>

                    <ErrorMessage name="status" component="div" />

                    <button
                      type="submit"
                      className="float-right btn btn-primary btn-button"
                    >
                      Submit
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Body>
        </Modal>

        {/* Modal for delete */}
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-button"
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

export default DoctorDashboard;

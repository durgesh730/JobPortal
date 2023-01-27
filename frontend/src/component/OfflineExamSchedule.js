import * as React from 'react';

import {
  Box,
  Typography,
  Modal,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import "./formInput.css";
import apiList from "../lib/apiList";
import axios from "axios";


const OfflineExamSchedule = () => {

  //  modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);



  const id = localStorage.getItem("token")
  // console.log(id);

  const [data, setData] = useState();

  const handleShow = async () => {
    axios
      .get(`http://localhost:4444/api/examUserData/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response);
      });
  }


  // 
  const [bool, setbool] = useState(false);
  // const setPopup = useContext(SetPopupContext);
  const [values, setValues] = useState({
    exam: ""
  });


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post(apiList.examschedule, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        // console.log(response);
        setbool(true);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  const PostData = async (e) => {
    // const history = useHistory();
    e.preventDefault();
    // const {exam} = values;
    const res = await fetch("/examschedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        values
      })
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid input");
      console.log("Invalid Input");

    } else {
      window.alert("Exam scheduling successful");
      console.log("Exam scheduling successful");
      // history.push("/home");
    }

  }

  const [attandance_confirm] = useState(true)
  // console.log(Userid)

  const handleAttendance = async (id) => {

    const datafetch = await fetch(`http://localhost:4444/api/saveAttendance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ attandance_confirm })
    });
    const res = await datafetch.json()
    console.log(res);
    window.location.reload()
    // setData(res);
  }

  useEffect(() => {
    handleShow()
    // handleAttendance();
  }, [setData])


  return (
    <>

      <div className='exam_btn' >
        <Button onClick={handleOpen}>Request For Test</Button>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="modal_box" >
          <div className='box' >
          <span className='close' onClick={handleClose} >&times;</span>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Select Test Name
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Test</InputLabel>
              <Select style={{ color: "white" }} labelId="demo-simple-select-label" id="demo-simple-select" value={values.exam} label="exam" name='exam' onChange={onChange} >

                <MenuItem name="AWS" value={"AWS"}>AWS </MenuItem>
                <MenuItem name="GATE" value={"GATE"}>GATE</MenuItem>
              </Select>
            </FormControl>

            <div className='modal_btn' >
              <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </div>
          </div>
        </Box>
      </Modal>


      <div className='applicantForm'>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th className="col">Test Name</th>
              <th className="col">Location</th>
              <th className="col">Time</th>
              <th className="col">Attendance</th>
              <th className="col">Document</th>
              <th className="col">Address</th>
              <th className="col">Phone Number</th>
              <th className="col">Email</th>
            </tr>
          </thead>

          <div className='line'></div>

          {data?.map((data) =>
            <>
              <tbody>
                <tr >
                  <td>{data.test_name}</td>
                  {/* <td>{not.test_dec}</td> */}
                  <td>{data.location}</td>
                  <td>{data.time}</td>
                  <td>{!data.attandance_confirm ? "Pending" : "Confirmed"}</td>
                  {/* <td>{data.status}</td> */}
                  <td>{data.test_document}</td>
                  <td>{data.address}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>
                  <td>
                    <div className='form_button' style={{ display: `${data.attandance_confirm || data.location == "Pending" ? "none" : "block"}` }} >
                      <a onClick={() => { handleAttendance(data._id) }}>Confirm</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
};


export default OfflineExamSchedule;
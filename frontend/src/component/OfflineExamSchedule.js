import { Redirect } from 'react-router-dom';
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
  SelectChangeEvent,
} from "@material-ui/core";

import { useContext, useState,useEffect } from "react";
import "./formInput.css";
import FormInput from "./ExamFormInput";
import apiList from "../lib/apiList";
import axios from "axios";
import { SetPopupContext } from "../App";


const style = {
  position: 'absolute',
  top: '10rem',
  // bottom: '0px',
  left: '50rem',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const OfflineExamSchedule = () => {

  //  modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);



  const [Confirm, setConfirm] = useState();
  
  const id = localStorage.getItem("token")
  console.log(id);
  const [data, setData] = useState();

  const handleShow = async () => {
    axios
      .get(`http://localhost:4444/api/examUserData/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response);
      });
  }

  useEffect(() => {
    handleShow()
  }, [setData])

  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  // 
  const [bool, setbool] = useState(false);
  // const setPopup = useContext(SetPopupContext);
  const [values, setValues] = useState({
    exam: ""
  });

  // const inputs = [
  //   {
  //     id: 1,
  //     name: "location",
  //     type: "text",
  //     placeholder: "Exam Location",
  //     errorMessage:
  //       "Location should be 3-16 characters and shouldn't include any special character!",
  //     label: "Location",
  //     pattern: "^[A-Za-z0-9]{3,16}$",
  //     required: true,
  //   },
  //   {
  //     id: 2,
  //     name: "examDate",
  //     type: "date",
  //     placeholder: "Exam Date",
  //     label: "Exam Date",
  //     required: true,
  //   },
  //   {
  //     id: 3,
  //     name: "time",
  //     type: "time",
  //     placeholder: "Exam time",
  //     label: "Exam time",
  //     required: true,
  //   }
  // ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post(apiList.examschedule, values , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response);
        setbool(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  // if (bool === true) {
  //   return <Redirect to="/home" />
  // }
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

  const handleModal  =async ()=>{
      // const data = await fetch(`http://localhost:4444/api/examUserData/${id}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ Confirm})
      // });
      // const res = await data.json()
      // console.log(res);
      // setData(res);
  }



  return (
    <>

      <div className='exam_btn' >

        <Button onClick={handleOpen}>Request For Test</Button>
      </div>


      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_box" >
          <div className='box' >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Select Test Name
            </Typography>

            {/* <FormControl className='option' sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Test</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={values.exam}
                label="exam"
                name='exam'
                onChange={onChange}
              >
                <MenuItem value={"AWS"}  >AWS</MenuItem>
                <MenuItem value={"GATE"}  >GATE</MenuItem>
              </Select>
            </FormControl> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.exam}
                label="exam"
                name='exam'
                onChange={onChange}
              >
                <MenuItem name="AWS" value={"AWS"}>AWS </MenuItem>
                <MenuItem name="GATE" value={"GATE"}>GATE</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem> */}
              </Select>
            </FormControl>

            <div className='modal_btn' >
              <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </div>
          </div>
        </Box>
      </Modal>


      <div className='form' >
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th className="col">Test Name</th>
              <th className="col">Location</th>
              <th className="col">Time</th>
              <th className="col">Attandance</th>
              <th className="col">Document</th>
              <th className="col">addressess</th>
              <th className="col">Phone Number</th>
              <th className="col">Email</th>
            </tr>
          </thead>

          {data?.map((data) =>
            <>
              <tbody>
                <tr className='sub'>
                  <td>{data.test_name}</td>
                  {/* <td>{not.test_dec}</td> */}
                  <td>{data.location}</td>
                  <td>{data.time}</td>
                  {/* <td>{!not.attandance_confirm ? "pending" : "coming"}</td> */}
                  <td>{data.status}</td>
                  <td>{data.test_document}</td>
                  <td>{data.address}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>

                  <div className='form_buttom' >
                    <a onClick={() => { handleModal() }}>Confirm</a>
                  </div>
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

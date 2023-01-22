import { Redirect } from 'react-router-dom';
import { useContext, useState } from "react";
import "./formInput.css";
import FormInput from "./ExamFormInput";
import apiList from "../lib/apiList";
import axios from "axios";
import { SetPopupContext } from "../App";



const OfflineExamSchedule = () => {
    const [bool, setbool] = useState(false);
    const setPopup = useContext(SetPopupContext);
    const [values, setValues] = useState({
      location: "",
      examDate: "",
      time: "",
    });
  
    const inputs = [
      {
        id: 1,
        name: "location",
        type: "text",
        placeholder: "Exam Location",
        errorMessage:
          "Location should be 3-16 characters and shouldn't include any special character!",
        label: "Location",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "examDate",
        type: "date",
        placeholder: "Exam Date",
        label: "Exam Date",
        required: true,
      },
     {
        id: 3,
        name: "time",
        type:"time",
        placeholder:"Exam time",
        label: "Exam time",
        required: true,
     }
    ];
    
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    console.log(values)
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(values);
      axios.post(apiList.examschedule,values)
      .then((response) => {
        console.log(response);
        setbool(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
    };


    if(bool === true){
      return <Redirect to="/home" />
    }
// const PostData = async (e) => {
//   const history = useHistory();
//   e.preventDefault();
//   const {location,date,time} = values;
//   const res = await fetch("/examschedule",{
//     method: "POST",
//     headers: {
//       "Content-Type":"application/json",
//       "Authorization":`Bearer ${localStorage.getItem("token")}`,
//     },
//     body:JSON.stringify({
//       location,date,time
//     })
//   });

//   const data = await res.json();
//   if(data.status === 422 || !data){
//     window.alert("Invalid input");
//     console.log("Invalid Input");
    
//   } else {
//     window.alert("Exam scheduling successful");
//     console.log("Exam scheduling successful");
//     history.push("/home");
//   }

// }
  
   
  
    return (
      <div className="app">
        <form onSubmit={(e)=>{handleSubmit(e)}} method="POST" >
          <h1>Schedule Exam</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button   className="examForm-btn" >Submit</button>
        </form>
      </div>
    );
  };
  
  export default OfflineExamSchedule;
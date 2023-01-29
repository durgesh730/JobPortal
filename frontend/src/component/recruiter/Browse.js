import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Browse = () => {

    const [data , setData]  = useState([]);

    const [resumeData , setResumeData]  = useState([]);
    

    const handleShow = async () => {
        axios
          .get(`http://localhost:4444/api/recruiterinfo`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            setData(response.data);
           const resumelist = response.data.resumelist;
           resumelist.forEach(element => {
                 getResume(element.resumeId);
           });
             
          })
          .catch((err) => {
            // console.log(err.response);
            console.log(err.response);
          });
      }

      const getResume = (id) => {
        axios
          .get(`http://localhost:4444/api/getresume/${id}`)
          .then((res) => {
            console.log(res)
            // resumeData.push(res.data[0])
            setResumeData([...resumeData, res.data[0]])
          })
          .catch((err) => {
            console.log(err);
          })
      }
    
      console.log(resumeData)

      useEffect(() => {
        handleShow()
      }, [setData])
    
      

    return (
        <>
             
             { resumeData?.map((item , index) =>{
                  console.log(item.basicInfo.name)
                return(
                  <>
                  <div key={index} className="rsdiv">
                    <h3>{item.basicInfo.name}</h3>
                    <h3>{item.basicInfo.title}</h3>
                    <Link to={{pathname:"/myresume" , state:{item}}}>View</Link>
                  </div>
                  </>
                )
            })}

        </>
    )
}

export default Browse

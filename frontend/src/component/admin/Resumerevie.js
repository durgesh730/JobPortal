import React , { useState , useEffect} from 'react';
import axios from 'axios';
import apiList from '../../lib/apiList';
import { Link } from 'react-router-dom';
const Resumereview = () => {
  const [resumes, setresumes] = useState([]);
  console.log(resumes)
    const getAllResume = () => {
        axios
          .get(apiList.allResume)
          .then((res) => {
            setresumes(res.data)
          })
          .catch((err) => {
            console.log(err);
          })
    }
    useEffect(() => {
      getAllResume();
    }, [])
    
    return(
        <>
            {Array.from(resumes).map((item , index) =>{
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

export default Resumereview;
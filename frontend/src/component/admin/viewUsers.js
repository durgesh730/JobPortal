import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './viewUser.css'


const ViewUsers = () => {

  const [name, setName] = useState();
  const [data, setData] = useState();
  // const [form, setForm] = useState()

  const userData = async () => {
    const res = await fetch(`http://localhost:4444/api/fetchUsersData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    // console.log(data);
    setData(data)
  }

  const userName = async () => {
    const data = await fetch(`http://localhost:4444/api/applicantData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const res = await data.json()
    // console.log(res);
    setName(res);
  }

  useEffect(() => {
    userData()
    userName()
  }, [setData])

  return (
    <>

      <div className='start'>
        <div className='name'>
          <span className='heading'> <b> Name</b> </span> <br></br>
          {
            name?.map((set) => {
              return (<span> {set.name} <br></br> </span>)
            })
          }
        </div>

        <div className='info' >
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th className="col">Email Id</th>
                <th className="col">Type</th>
                <th className="col">Subscription</th>
              </tr>
            </thead>

            <tbody>
            {data?.map((not) =>
              <>
                  <tr>
                    {/* <td>name</td> */}
                    <td>{not.email}</td>
                    <td>{not.type}</td>
                    <td>{not.subscription}</td>
                  </tr>
              </>
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="adminbtn" >
        <Link to={'/examform'}  >Form</Link>
      </div> */}

    </>
  )
}

export default ViewUsers

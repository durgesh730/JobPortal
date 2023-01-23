import React, { useEffect, useState } from 'react'
import './viewUser.css'


const ViewUsers = () => {

  const [name, setName] = useState();
  const [data, setData] = useState();
  const [form, setForm] = useState()

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


  const handleOpen = async () => {
    const data = await fetch(`http://localhost:4444/api//examform`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const res = await data.json()
    console.log(res);
    setName(res);

  }

  return (
    <>

    <div className='start' >

      <div className='name'>
        <span className='heading' > Name </span> <br></br>
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
            </tr>
          </thead>

          {data?.map((not) =>
            <>
              <tbody>
                <tr>
                  {/* <td>name</td> */}
                  <td>{not.email}</td>
                  <td>{not.type}</td>
                </tr>
              </tbody>
            </>
          )}
        </table>
      </div>

      </div>
      <button onClick={handleOpen} >form</button>

    </>
  )
}

export default ViewUsers

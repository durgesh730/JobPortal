import React, { useEffect, useState } from 'react'
import './viewUser.css'


const ViewUsers = () => {

  const [name, setName] = useState();
  const [data, setData] = useState();

  const userData = async () => {
    const res = await fetch(`http://localhost:4444/api/fetchUsersData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    console.log(data);
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
      <div className='info' >
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th className="col">Name</th>
              <th className="col">Email Id</th>
              <th className="col">Type</th>
            </tr>
          </thead>
          {data?.map((not) =>
            <>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>{not.email}</td>
                  <td>{not.type}</td>
                </tr>
              </tbody>
            </>
          )}
        </table>
      </div>

    </>
  )
}

export default ViewUsers

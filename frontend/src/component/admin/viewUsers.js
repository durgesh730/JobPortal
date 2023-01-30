import React, { useEffect, useState } from 'react'
import './viewUser.css'


const ViewUsers = () => {

  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);


  const StatusData = async (id) => {
    const res = await fetch(`http://localhost:4444/api/StatusData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    console.log(data)
    if (data !== null) {
      setResult((prev) => [...prev, data]);
    }
  }

  const userData = async () => {
    const res = await fetch(`http://localhost:4444/api/fetchUsersData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    data.forEach(element => {
      StatusData(element._id);
    });
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
    setName(res)
  }

  useEffect(() => {
    userData()
    userName()
  }, [setData])

  return (
    <>


      {!name || !data ?
        (<div class="loader"></div>) : (

          <div className='start'>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th className="col">Name</th>
                </tr>
              </thead>

              <tbody>
                {
                  name?.map((set) => {
                    return (<tr><td> {set.name} <br></br> </td></tr>)
                  })
                }
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th className="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {
                  result?.map((items) => {
                    return ( <tr><td> {items.status} <br></br> </td> </tr>  )
                  })
                }

              </tbody>
            </table>


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
                  {data?.map((not, i) =>
                    <>
                      {not.type == "recruiter" ? (" ") : (
                        <tr key={i} >
                          <td>{not.email}</td>
                          <td>{not.type}</td>
                          <td>{not.subscription}</td>
                        </tr>
                      )}
                    </>

                  )}
                </tbody>
              </table>
            </div>
          </div>

        )}

      {/* <div className="adminbtn" >
        <Link to={'/examform'}  >Form</Link>
      </div> */}

    </>
  )
}

export default ViewUsers

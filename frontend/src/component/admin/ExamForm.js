import React, { useEffect, useState } from 'react'

const ExamForm = () => {

    const [distwo, setdistwo] = useState("none");

    const [dis, setdis] = useState("none");
    var [id, setId] = useState();

    const handleModalSecond = (not) => {
        status.onSet(not.status);
        setId(not._id)
        setdistwo('block')
    }

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        const changeValue = (v) => {
            setValue(v)
        }
        return {
            value,
            onChange: handleChange,
            onSet: changeValue
        };
    };

    const testName = useInput("");
    const location = useInput("");
    const time = useInput("");
    const attendence = useInput("");
    const status = useInput("");
    const document = useInput("");
    const address = useInput("");
    const phone_number = useInput("");
    const email = useInput("");


    const handleModal = (not) => {
        location.onSet(not.location);
        time.onSet(not.time);
        address.onSet(not.address);
        phone_number.onSet(not.phone_number);
        email.onSet(not.email);
        setId(not._id)
        setdis("block");
    }

    function handleClose() {
        setdis("none");
        setdistwo('none')
    }

    const SubmitDetails = async () => {
        const res = await fetch(`http://localhost:4444/api/savedata/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                location: location.value, time: time.value,
                address: address.value, phone_number: phone_number.value, email: email.value,
                status: status.value
            })
        });
        const data = await res.json()
        setdis("none");
        window.location.reload()
    }

    const [form, setForm] = useState([]);
    // console.log(form)

    const userName = async (id) => {
        const data = await fetch(`http://localhost:4444/api/applicantName/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await data.json();
        return res[0].name;
    }


    const handleData = async () => {
        const data = await fetch(`http://localhost:4444/api/examform`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await data.json()
        res.forEach(async element => {
            let name = await userName(element.userId);
            element.name = name;
            setForm((prev) => [...prev, element]);
        });
    }

    useEffect(() => {
        handleData()
    }, [setForm])

    return (
        <>

            {!form[0] ?
                (<div className="loader"></div>) : (

                    <div className='form examform' >
                        <table className="examtable table">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="col">Name</th>
                                    <th className="col">Test Name</th>
                                    <th className="col">Location</th>
                                    <th className="col">Time</th>
                                    <th className="col">Attendance</th>
                                    <th className="col">Status</th>
                                    <th className="col">Document</th>
                                    <th className="col">Address</th>
                                    <th className="col">Phone Number</th>
                                    <th className="col">Email</th>
                                </tr>
                            </thead>

                            <tbody>
                                {form?.map((not, index) => {
                                    return (
                                        <>
                                            <tr key={index} >
                                                <td> {not.name} </td>
                                                <td>{not.test_name}</td>
                                                <td>{not.location}</td>
                                                <td>{not.time}</td>
                                                <td>{!not.attandance_confirm ? "Pending" : "Confirmed"}</td>
                                                <td>{not.status}</td>
                                                <td>{not.test_document}</td>
                                                <td>{not.address}</td>
                                                <td>{not.phone_number}</td>
                                                <td>{not.email}</td>

                                                <td>
                                                    <div className='form_buttom'>
                                                        {!not.attandance_confirm ? ("") : (<a onClick={() => { handleModalSecond(not) }} >Edit </a>)}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='form_buttom' >
                                                        <a onClick={() => { handleModal(not) }} > {not.attandance_confirm ? "Reschedule" : "Schedule"} </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }


            <div id="myModal" className="modal" style={{ display: `${dis}` }}>
                <div className="modal-content">
                    <form className='inputs' action="">
                        <div className="inputBox">
                            <label>Location</label><br />
                            <input type="text" value={location.value} onChange={location.onChange} />
                        </div>
                        <div className="inputBox">
                            <label>Time</label><br />
                            <input type="text" value={time.value} onChange={time.onChange} />
                        </div>
                        <div className="inputBox">
                            <label>Address</label><br />
                            <input type="text" value={address.value} onChange={address.onChange} />
                        </div>
                        <div className="inputBox">
                            <label>Phone Number</label><br />
                            <input type="text" value={phone_number.value} onChange={phone_number.onChange} />
                        </div>
                        <div className="inputBox">
                            <label>Email</label><br />
                            <input type="text" value={email.value} onChange={email.onChange} />
                        </div>
                    </form>

                    <div className='form-btn' >
                        <button className='btn' onClick={handleClose} > Close </button>
                        <button className='btn' onClick={SubmitDetails} > Submit </button>
                    </div>
                </div>
            </div>

            {/* ======================================= edit modal ========================================================== */}

            <div id="myModal" className="modal" style={{ display: `${distwo}` }}>
                <div className="modal-content">
                    <form className='inputs' action="">
                        <div className="inputBox">
                            <label>Status</label><br />
                            {/* <input type="text"   /> */}
                            <select name="status" value={status.value} id="status" onChange={status.onChange} >
                                <option value="Pending">Pending</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                            </select>
                        </div>
                        <div className='doc' >
                            <label className="form-label" htmlFor="customFile">Change Document </label>
                            <input type="file" className="form-control" id="customFile" />
                        </div>
                    </form>

                    <div className='form-btn' >
                        <button className='btn' onClick={handleClose} > Close </button>
                        <button className='btn' onClick={SubmitDetails} > Submit </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ExamForm

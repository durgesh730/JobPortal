import React, { useEffect, useState } from 'react'

const ExamForm = () => {

    // var [details, setdetails] = useState(false);
    const [dis, setdis] = useState("none");

    var [id, setId] = useState();

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        const changeValue = (v) => {
            console.log(v);
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
        // console.log(id);
        setdis("block");
    }

    function handleClose() {
        setdis("none");
    }


    const SubmitDetails = async () => {

        console.log(location, email)

        const res = await fetch(`http://localhost:4444/api/savedata/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location:location.value, time:time.value, address:address.value, phone_number:phone_number.value, email:email.value })
        });
        const data = await res.json()
        console.log(data);
        setdis("none");
        window.location.reload()
        // console.log(location)


    }

    const [form, setForm] = useState();

    const handleData = async () => {
        const data = await fetch(`http://localhost:4444/api/examform`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await data.json()
        console.log(res);
        setForm(res);
    }

    useEffect(() => {
        handleData()
    }, [setForm])

    return (
        <>
            <div className='form' >
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th className="col">Test Name</th>
                            {/* <th className="col">Test Description</th> */}
                            <th className="col">Location</th>
                            <th className="col">Time</th>
                            <th className="col">Attandance</th>
                            <th className="col">status</th>
                            <th className="col">Document</th>
                            <th className="col">addressess</th>
                            <th className="col">Phone Number</th>
                            <th className="col">Email</th>
                        </tr>
                    </thead>

                    {form?.map((not) =>
                        <>
                            <tbody>
                                <tr className='sub'>
                                    <td>{not.test_name}</td>
                                    {/* <td>{not.test_dec}</td> */}
                                    <td>{not.location}</td>
                                    <td>{not.time}</td>
                                    <td>{!not.attandance_confirm?"pending":"coming"}</td>
                                    <td>{not.status}</td>
                                    <td>{not.test_document}</td>
                                    <td>{not.address}</td>
                                    <td>{not.phone_number}</td>
                                    <td>{not.email}</td>
                                    <div className='form_buttom' >
                                        <a onClick={() => { handleModal(not) }} >Schedule</a>
                                    </div>
                                </tr>
                            </tbody>
                        </>
                    )}
                </table>
            </div>



            <div id="myModal" class="modal" style={{ display: `${dis}` }}>
                <div class="modal-content">
                    <form className='inputs' action="">
                        <div class="inputBox">
                            <label>Location</label><br />
                            <input type="text" value={location.value} onChange={location.onChange} />
                        </div>
                        <div class="inputBox">
                            <label>Time</label><br />
                            <input type="text" value={time.value} onChange={time.onChange} />
                        </div>
                        <div class="inputBox">
                            <label>Address</label><br />
                            <input type="text" value={address.value} onChange={address.onChange} />
                        </div>
                        <div class="inputBox">
                            <label>Phone Number</label><br />
                            <input type="text" value={phone_number.value} onChange={phone_number.onChange} />
                        </div>
                        <div class="inputBox">
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


        </>
    )
}

export default ExamForm 

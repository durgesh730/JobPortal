import React from 'react'

const Form = () => {
    
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

export default Form

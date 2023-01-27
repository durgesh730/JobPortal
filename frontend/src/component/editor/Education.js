import React, {useState} from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const Education = (props) => {
    const prop = props.props ;
    const [s, sets] = useState({ university: "", degree: "" , cgpa : "" });
    const [bool, setbool] = useState("none")
    return(
        <>
        <div className='modal1' style={{ display: `${prop.eduDisplay}` }}>
            <span className='close' onClick={()=>{prop.seteduDisplay("none")}} >&times;</span>
                <Grid container direction="column" spacing={4} alignItems="center">

                    {Array.from(prop.education).map((item, index) => {
                        if (item) {
                            return (
                                <>
                                    <div >
                                        <input type="text" placeholder={item.university} onChange={(event)=>{prop.education[index].university = event.target.value}} />
                                        <input type="text" placeholder={item.degree} onChange={(event)=>{prop.education[index].degree = event.target.value}} />
                                        <input type="text" placeholder={item.cgpa} onChange={(event)=>{prop.education[index].cgpa = event.target.value}} />
                                    </div>
                                    <br/>
                                </>
                            )
                        } else {
                            return (
                                <></>
                            )
                        }
                    })}
                    <Button style={{display:prop.education.length === 0 ? "none":""}} 
                        variant="contained"
                        color="primary"
                        onClick={() => { prop.seteduDisplay("none") }}>
                                Save
                            </Button>
                    <br/><hr/><br/>

                    <Button style={{display:`${bool === "none" ? "":"none"}`}} variant="contained" color="primary" onClick={() => {setbool("block")}}>Add New</Button>
                    <div style={{display:`${bool}`}}>
                        <h1>Add New</h1>
                        <Grid container direction='column' spacing={4} >
                            <Grid item>
                                <TextField
                                    label="University"
                                    value={s.university}
                                    onChange={(event) => sets({ ...s, university: event.target.value })}
                                    variant="outlined"
                                    placeholder='University Name'
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Degree"
                                    value={s.degree}
                                    onChange={(event) => sets({ ...s, degree: event.target.value })}
                                    variant="outlined"
                                    placeholder='your degree'
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Percentage or CGPA"
                                    value={s.cgpa}
                                    onChange={(event) => sets({ ...s, cgpa: event.target.value })}
                                    variant="outlined"
                                    placeholder='eg. 8'
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {prop.addEducation(s) ; sets({...s , university: "", degree: "" , cgpa : "" }) ;setbool("none") }}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>
        </>
    )
}

export default Education;
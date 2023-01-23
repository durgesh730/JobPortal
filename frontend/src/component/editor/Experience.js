import React, {useState} from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const Experience = (props) => {
    const prop = props.props ;
    const [s, sets] = useState({ company: "Company Name", designation: "Designation" , exp : "eg. 1" , desc : "Description of your job" });
    const [bool, setbool] = useState("none")
    return(
        <>
        <div className='modal' style={{ display: `${prop.expDisplay}` }}>
                <Grid container direction="column" spacing={4} alignItems="center">

                    {Array.from(prop.experience).map((item, index) => {
                        if (item) {
                            return (
                                <>
                                    <div >
                                        <input type="text" placeholder={item.company} onChange={(event)=>{prop.experience[index].company = event.target.value}} />
                                        <input type="text" placeholder={item.designation} onChange={(event)=>{prop.experience[index].designation = event.target.value}} />
                                        <input type="text" placeholder={item.exp} onChange={(event)=>{prop.experience[index].exp = event.target.value}} />
                                        <input type="text" placeholder={item.desc} onChange={(event)=>{prop.experience[index].desc = event.target.value}} />
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
                    <Button style={{display:prop.experience.length === 0 ? "none":""}} variant="contained"
                                color="primary"
                                onClick={() => { prop.setexpDisplay("none") }}
                            >
                                Save
                            </Button>
                    <br/><hr/><br/>

                    <Button style={{display:`${bool === "none" ? "":"none"}`}} variant="contained" color="primary" onClick={() => {setbool("block")}}>Add New</Button>
                    <div style={{display:`${bool}`}}>
                        <h1>Add New</h1>
                        <Grid container direction='column' spacing={4} >
                            <Grid item>
                                <TextField
                                    label="Company"
                                    value={s.company}
                                    onChange={(event) => sets({ ...s, company: event.target.value })}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Designation"
                                    value={s.designation}
                                    onChange={(event) => sets({ ...s, designation: event.target.value })}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Experience of years"
                                    value={s.exp}
                                    onChange={(event) => sets({ ...s, exp: event.target.value })}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Description"
                                    value={s.desc}
                                    onChange={(event) => sets({ ...s, desc: event.target.value })}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {prop.addExpereince(s) ; setbool("none") }}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>
        </>
    )
}

export default Experience;
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const Skills = (props) => {
    const prop = props.props;
    const [s, sets] = useState({ skillHead: "Skill"});
    const [bool, setbool] = useState('none');
    return (
        <>
            <div className='modal' style={{ display: `${prop.SkillDisplay}` }}>
                <Grid container direction="column" spacing={4} alignItems="center">

                    {Array.from(prop.skills).map((item, index) => {
                        if (item) {
                            return (
                                <>
                                    <div >
                                        <input type="text" placeholder={item.skillHead} onChange={(event)=>{prop.skills[index].skillHead = event.target.value}} />
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
                    <Button style={{display:prop.skills.length === 0 ? "none":""}} variant="contained"
                                color="primary"
                                onClick={() => { prop.setSkillDisplay("none") }}
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
                                    label="Skill"
                                    value={s.skillHead}
                                    onChange={(event) => sets({ ...s, skillHead: event.target.value })}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {prop.addSkill(s) ; setbool("none") }}
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

export default Skills;
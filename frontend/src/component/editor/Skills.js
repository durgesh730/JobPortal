import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const Skills = (props) => {
    const prop = props.props;
    const [s, sets] = useState({ skillHead: "Skill Heading", skillDesc: "Describe Your Skill" });
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
                                        <input type="text" placehovallder={item.skillHead} onChange={(event)=>{prop.skills[index].skillHead = event.target.value}} />
                                        <input type="text" placeholder={item.skillDesc} onChange={(event)=>{prop.skills[index].skillDesc = event.target.value}} />
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
                    <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { prop.setSkillDisplay("none") }}
                            >
                                Save
                            </Button>
                    <br/><hr/><br/>

                    <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {setbool("block")}}
                            >
                                Add New
                            </Button>
                    <div style={{display:`${bool}`}}>
                        <h1>Add New</h1>
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
                            <TextField
                                label="Skill Description"
                                value={s.skillDesc}
                                onChange={(event) => sets({ ...s, skillDesc: event.target.value })}
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
                    </div>
                </Grid>
            </div>
        </>
    )
}

export default Skills;
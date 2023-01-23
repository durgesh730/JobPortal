import React, { useState } from 'react';
import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import './resume.css';
import BasicInfo from './editor/BasicInfo';
import Skills from './editor/Skills';

const useStyles = makeStyles((theme) => ({
    body: {
        padding: "60px 60px",
    },
    inputBox: {
        width: "300px",
    },
    submitButton: {
        width: "300px",
    },
}));

const Resume = () => {
    const classes = useStyles();
    const handleResume = (e) => {
        e.preventDefault();
    }
    const [basicInfo, setbasicInfo] = useState({
        name: "Your Name",
        title: "Your Job Title",
        email: "example@gmail.com",
        mobile: "Your Mobile No.",
        description: "Your brief description"
    })
    const [skills, setSkills] = useState([]);
    const [experience, setexperience] = useState([]);
    const [education, seteducation] = useState([]);
    const [idisplay, setIdisplay] = useState('none');
    const [SkillDisplay, setSkillDisplay] = useState("none")
    const addSkill = (item) => {
        console.log(item)
        skills.push(item);
    };
    
    return (
        <>
            <BasicInfo props={{ idisplay, setIdisplay, basicInfo, setbasicInfo }} />
            <Skills props={{ SkillDisplay, setSkillDisplay, skills , addSkill }} />
            <Paper elevation={3} className={classes.body}>
                <Grid item xs>
                    <Typography variant="h2">My Resume</Typography>
                </Grid>
                <Grid container item direction="column" alignItems="center"
                    style={{ padding: "30px", minHeight: "93vh" }} >
                    <div id="doc2" class="yui-t7">
                        <div id="inner">

                            <div id="hd">
                                <div className="cross" onClick={() => { setIdisplay("block") }}>&#9997;</div>
                                <div class="yui-gc">
                                    <div class="yui-u first">
                                        <h1>{basicInfo.name}</h1>
                                        <h2>{basicInfo.title}</h2>
                                    </div>

                                    <div class="yui-u">
                                        <div class="contact-info">
                                            <h3><a href={basicInfo.email}>{basicInfo.email}</a></h3>
                                            <h3>{basicInfo.mobile}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="bd">
                                <div id="yui-main">
                                    <div class="yui-b">
                                        <div class="yui-gf">
                                            <div class="yui-u first">
                                                <h2>Description</h2>
                                            </div>
                                            <div class="yui-u">
                                                <p class="enlarge">
                                                    {basicInfo.description}
                                                </p>
                                            </div>
                                        </div>


                                        <div class="yui-gf">
                                            <div className="cross" onClick={() => { setSkillDisplay("block") }}>&#9997;</div>
                                            <div class="yui-u first">
                                                <h2>Skills</h2>
                                            </div>
                                            <br />
                                            <div class="yui-u">
                                                {Array.from(skills).map((item , index) => {
                                                    if(item){
                                                        return (
                                                            <>
                                                                <div>
                                                                    <h2>{item.skillHead}</h2>
                                                                    <p>{item.skillDesc}</p>
                                                                </div>
                                                            </>
                                                        )
                                                    }else{
                                                        return(
                                                            <></>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div class="yui-gf">
                                            <div className="cross">&#9997;</div>
                                            <div class="yui-u first">
                                                <h2>Experience</h2>
                                            </div>
                                            <br />
                                            <div class="yui-u">

                                                {/* <div class="job">
                                                <h2>Facebook</h2>
                                                <h3>Senior Interface Designer</h3>
                                                <h4>2005-2007</h4>
                                                <p>Intrinsicly enable optimal core competencies through corporate relationships. Phosfluorescently implement worldwide vortals and client-focused imperatives. Conveniently initiate virtual paradigms and top-line convergence. </p>
                                            </div> */}

                                            </div>
                                        </div>


                                        <div class="yui-gf last">
                                            <div className="cross">&#9997;</div>
                                            <div class="yui-u first">
                                                <h2>Education</h2>
                                            </div>
                                            {/* <div class="yui-u">
                                            <h2>Indiana University - Bloomington, Indiana</h2>
                                            <h3>Dual Major, Economics and English &mdash; <strong>4.0 GPA</strong> </h3>
                                        </div> */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handleResume()} className={classes.submitButton}>
                        Submit Resume
                    </Button>
                </Grid>
            </Paper>
        </>
    )
}

export default Resume;
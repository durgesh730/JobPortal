import React, { useState } from 'react';
import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import './resume.css';
import BasicInfo from './editor/BasicInfo';
import Skills from './editor/Skills';
import Experience from './editor/Experience';
import Education from './editor/Education';

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
    const [SkillDisplay, setSkillDisplay] = useState("none");
    const [expDisplay, setexpDisplay] = useState("none");
    const [eduDisplay, seteduDisplay] = useState("none")

    const addSkill = (item) => {
        skills.push(item);
    };
    const addExpereince = (item) => {
        experience.push(item)
    };
    const addEducation = (item) => {
        education.push(item);
    }
    console.log(experience)
    return (
        <>
            <BasicInfo props={{ idisplay, setIdisplay, basicInfo, setbasicInfo }} />
            <Skills props={{ SkillDisplay, setSkillDisplay, skills, addSkill }} />
            <Experience props={{ expDisplay, setexpDisplay, experience, addExpereince }} />
            <Education props={{ eduDisplay, seteduDisplay, education, addEducation }} />
            <Paper style={{ width: "70%" }} elevation={3} className={classes.body}>
                <Grid item xs>
                    <Typography variant="h2">My Resume</Typography>
                </Grid>
                <Grid container item alignItems="center"
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
                                                {Array.from(skills).map((item, index) => {
                                                    if (item) {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <h2>{item.skillHead}</h2>
                                                                    <p>{item.skillDesc}</p>
                                                                </div>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <></>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div class="yui-gf">
                                            <div className="cross" onClick={() => { setexpDisplay("block") }}>&#9997;</div>
                                            <div class="yui-u first">
                                                <h2>Experience</h2>
                                            </div>
                                            <br />
                                            <div class="yui-u">
                                                {Array.from(experience).map((item, index) => {
                                                    if (item) {
                                                        return (
                                                            <>
                                                                <div class="job">
                                                                    <h2>{item.company}</h2>
                                                                    <h3>{item.designation}</h3>
                                                                    <h4>{item.exp}</h4>
                                                                    <p>{item.desc}</p>
                                                                </div>
                                                                <br />
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <></>
                                                        )
                                                    }
                                                })}


                                            </div>
                                        </div>


                                        <div class="yui-gf last">
                                            <div className="cross" onClick={() => { seteduDisplay("block") }}>&#9997;</div>
                                            <div class="yui-u first">
                                                <h2>Education</h2>
                                            </div>
                                            <div class="yui-u">
                                                {Array.from(education).map((item, index) => {
                                                    if (item) {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <h2>{item.university}</h2>
                                                                    <h3>{item.degree} &mdash; <strong>{item.cgpa} GPA</strong> </h3>
                                                                </div>
                                                                <br />
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <></>
                                                        )
                                                    }
                                                })}

                                            </div>
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
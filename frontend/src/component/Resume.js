import React, { useContext, useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import './resume.css';
import BasicInfo from './editor/BasicInfo';
import Skills from './editor/Skills';
import Experience from './editor/Experience';
import Education from './editor/Education';
import { SetPopupContext } from "../App";
import axios from 'axios';
import apiList from '../lib/apiList';
import { userType } from '../lib/isAuth';
import { Link, useLocation } from 'react-router-dom';

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
    const auth = useContext(SetPopupContext);
    const location = useLocation();
    const classes = useStyles();
    const [resumeId, setresumeId] = useState("");
    let basicInfo = auth.basicInfo;
    let setbasicInfo = auth.setbasicInfo
    let skills = auth.skills;
    let addSkill = auth.addSkill;
    let experience = auth.experience;
    let addExpereince = auth.addExpereince;
    let education = auth.education;
    let addEducation = auth.addEducation;
    let submitted = auth.submitted;
    const resumeDetails = {
        basicInfo: basicInfo,
        skills: skills,
        expereince: experience,
        education: education
    }

    const handleResume = () => {
        if (submitted) {
            updateResume();
            return;
        }
        axios
            .post(apiList.resume, resumeDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                auth.setPopup({
                    open: true,
                    severity: "success",
                    message: "Resume Submitted Succesfully",
                });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.response);
                alert(err)
            });
    }



    const updateResume = () => {
        axios
            .put(apiList.updateResume, { ...resumeDetails, id: resumeId })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    window.location.reload();
                    auth.setPopup({
                        open: true,
                        severity: "success",
                        message: "Resume Updated Succesfully",
                    });
                } else {
                    alert("Something went wrong , please try again")
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const setData = (data) => {
        setresumeId(data._id)
        const basicInfo = data.basicInfo;
        setbasicInfo({
            ...basicInfo, name: basicInfo.name, title: basicInfo.title, email: basicInfo.email, mobile: basicInfo.mobile,
            description: basicInfo.description
        })
        Array.from(data.skills).forEach(item => { addSkill(item) });
        Array.from(data.expereince).forEach(item => { addExpereince(item) });
        Array.from(data.education).forEach(item => { addEducation(item) });
    }
    const getResume = () => {

        axios
            .get(apiList.findResume, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    auth.setsubmitted(false);
                } else {
                    auth.setsubmitted(true);
                    setData(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [idisplay, setIdisplay] = useState('none');
    const [SkillDisplay, setSkillDisplay] = useState("none");
    const [expDisplay, setexpDisplay] = useState("none");
    const [eduDisplay, seteduDisplay] = useState("none")
    const [bool, setbool] = useState(false);
    useEffect(() => {
        if (userType() == "Admin") {
            setData(location.state.item)
        } else {
            getResume();
        }
        setbool(false);
        setTimeout(() => {
            setbool(true)
        }, 500);
    }, [])

    const [dis, setdis] = useState("none");
    const handleModal = () => {
        setdis("block");
    }
    function handleClose() {
        setdis("none");
    }

    const [recruitersID, setRecruitersID] = useState([])
    const [IDrecruitersID, setIDrecruitersID] = useState([])

    const checkR = (e, not) => {
        let cValue = e.target.checked;

        
        let idValue = e.target.checked; 

        if (cValue === true) {
            recruitersID.push({  recruiterId:not.userId });
            // applyfilters();
        } else {
            setRecruitersID((current) =>
                current.filter((i) => {
                    return i.recruiterId !== not.userId;
                })
            );
        } 

        // ================================== recruiters


        if (idValue === true) {
            IDrecruitersID.push({  recruiterId:not._id });
            // applyfilters();
        } else {
            setIDrecruitersID((current) =>
                current.filter((i) => {
                    return i.recruiterId !== not._id;
                })
            );
        }

    }


    const handleSubmit = async () => {
        // console.log(recruitersID)
        // const data = await fetch(`http://localhost:4444/api/sendInResume/${location.state.item._id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ recruitersID })

        // });
        // const res = await data.json()
        // // console.log(res);
        // setRecruiters(res);
        IDrecruitersID.forEach((i)=>{
            SendToRecruiter(i)
        })
    }


    const SendToRecruiter = async (i) => {

         const resumelist = location.state.item._id

        // IDrecruitersID.forEach(async(i)=>{
        //     console.log(i.recruiterId)
            const data = await fetch(`http://localhost:4444/api/recruiters/${i.recruiterId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {resumeId:resumelist} )
    
            });
            const res = await data.json()
            console.log(res);
           
        // })
    }


        
    const [recruiters, setRecruiters] = useState([]);
    const handleData = async () => {
        const data = await fetch(`http://localhost:4444/api/findRecruiter`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await data.json()
        console.log(res);
        setRecruiters(res);
    }

    useEffect(() => {
        handleData()
    }, [setRecruiters])


    return (
        <>
            <BasicInfo props={{ idisplay, setIdisplay, basicInfo, setbasicInfo }} />
            <Skills props={{ SkillDisplay, setSkillDisplay, skills, addSkill }} />
            <Experience props={{ expDisplay, setexpDisplay, experience, addExpereince }} />
            <Education props={{ eduDisplay, seteduDisplay, education, addEducation }} />
            <Paper style={{ width: "70%" }} elevation={3} className={classes.body}>
                <Grid item xs>
                    {userType() == "Admin" ?
                        <Button> <Link to={{ pathname: "/admin/review_resume" }}>Back</Link></Button>
                        :
                        <Typography variant="h2">My Resume</Typography>
                    }
                </Grid>
                <Grid container item alignItems="center"
                    style={{ padding: "30px", minHeight: "93vh" }} >
                    <div id="doc2" class="yui-t7">
                        <div id="inner">

                            <div id="hd">
                                <div className="cross" onClick={() => { setIdisplay("block") }}>&#9997;</div>
                                <div class="yui-gc">
                                    <div class="yui-u first">
                                        <h1>{basicInfo.name == "" ? "Your Name" : basicInfo.name}</h1>
                                        <h2>{basicInfo.title == '' ? "Job Titile" : basicInfo.title}</h2>
                                    </div>

                                    <div class="yui-u">
                                        <div class="contact-info">
                                            <h3><a href={basicInfo.email}>{basicInfo.email == "" ? "Your email" : basicInfo.email}</a></h3>
                                            <h3>{basicInfo.mobile == "" ? "Mobile No." : basicInfo.mobile}</h3>
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
                                                    {basicInfo.description == "" ? "Your brief description" : basicInfo.description}
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
                                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                    {Array.from(skills).map((item, index) => {
                                                        if (item) {
                                                            return (
                                                                <Grid item xs={2} sm={4} md={4} key={index}>
                                                                    <div className='skillBox'>
                                                                        <h2>{item.skillHead}</h2>
                                                                    </div>
                                                                </Grid>
                                                            )
                                                        } else {
                                                            return (
                                                                <></>
                                                            )
                                                        }
                                                    })}
                                                </Grid>
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
                    <Button variant="contained" color="primary" onClick={() => userType() == "Admin" ? updateResume() : handleResume()} className={classes.submitButton}>
                        {userType() == "Admin" ? "Submit Review" : "Submit Resume"}
                    </Button>

                    <Button style={{ marginLeft: "2rem", display: `${userType() == "Admin" ? "" : "none"}` }} onClick={handleModal} variant="contained" color="primary" >
                        Send To Recruiters
                    </Button>
                </Grid>
            </Paper>


            {/* modal for sending resume */}

            <div id="myModal" class="modal" style={{ display: `${dis}` }}>

                <div class="modal-content">
                    <form className='inputs' action="">
                        {recruiters?.map((not) =>  { 
                            //  console.log(not._id)
                            return (<label class="container">
                                {not.name}
                                <input type="checkbox" onClick={(e) => { 
                                    checkR(e, not)
                                     }} />
                                <span class="checkmark"></span>
                            </label>)
                           
                        })

                        }
                    </form>

                    <div className='form-btn' >
                        <button className='btn' onClick={handleClose} > Close </button>
                        <button className='btn' onClick={handleSubmit} > Send </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resume;
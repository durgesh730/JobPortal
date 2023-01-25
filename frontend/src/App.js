import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import "./App.css";


import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import Admin from "./component/Admin";
import isAuth, { userType,subscriptionType } from "./lib/isAuth";
import Subscription from "./component/Subscription";
import Resumereview from "./component/admin/Resumerevie";
import OfflineExamSchedule from "./component/OfflineExamSchedule";
import Resume from "./component/Resume";
import MyUsers from "./component/admin/viewUsers";


function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [skills, setSkills] = useState([]);
  const [experience, setexperience] = useState([]);
  const [education, seteducation] = useState([]);
  const addSkill = (item) => {
    skills.push(item);
  };
  const addExpereince = (item) => {
      experience.push(item)
  };
  const addEducation = (item) => {
      education.push(item);
  }
  const [basicInfo, setbasicInfo] = useState({
    name: "Your Name",
    title: "Your Job Title",
    email: "example@gmail.com",
    mobile: "Your Mobile No.",
    description: "Your brief description"
})
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={{setPopup , basicInfo , setbasicInfo , skills , experience , education , addSkill , addExpereince , addEducation}}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/admin">
                <Admin/>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/admin/review_resume">
                <Resumereview />
              </Route>
              <Route exact path="/admin/viewUsers">
                {userType() != "recruiter" || "applicant" ? (
                  <MyUsers />
                ) : <></>}
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              {/* <Route exact path="/subscription">
             <Subscription/>
              </Route> */}
             <Route exact path="/examschedule">
              <OfflineExamSchedule/>
             </Route>
             <Route>
                <Resume exact path="/myresume"/>
             </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;

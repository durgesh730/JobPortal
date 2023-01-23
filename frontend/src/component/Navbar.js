import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import isAuth, { userType, subscriptionType } from "../lib/isAuth";
import Subscription from "./Subscription";
import OfflineExamSchedule from "./OfflineExamSchedule";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const [openSubscription, setSubscription] = useState(false);

  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isAuth() ? (
          <Typography variant="h6" className={classes.title}>
            Job Portal
            <Button onClick={() => setSubscription(true)}>
              Buy Subscription
            </Button>
            <Subscription
              open={openSubscription}
              onClose={() => setSubscription(false)}
            />
            <Button onClick={() => handleClick("/examschedule")}>
              Schedule Exam
            </Button>
          </Typography>
        ) : (
          <Typography variant="h6" className={classes.title}>
            Job Portal
          </Typography>
        )}
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          ) : userType() === "Admin" ? (
            <>
            <Button color="inherit" onClick={() => handleClick("/admin/review_resume")}>
              Review Resume
            </Button>
            <Button
              color="inherit"
              onClick={() => handleClick("/applications")}
            >
              Applications
            </Button>
            <Button color="inherit" onClick={() => handleClick("/logout")}>
              Logout
            </Button>
          </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myresume")}>
                Resume
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/admin")}>
              Admin
            </Button>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

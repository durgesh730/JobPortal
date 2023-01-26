const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const jwtAuth = require("../lib/jwtAuth");
const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");
const Admin = require("../db/Admin");
const router = express.Router();
const Resume = require("../db/Resume")

router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "recruiter"
          ? new Recruiter({
            userId: user._id,
            name: data.name,
            contactNumber: data.contactNumber,
            bio: data.bio,
          })
          : new JobApplicant({
            userId: user._id,
            name: data.name,
            education: data.education,
            skills: data.skills,
            rating: data.rating,
            resume: data.resume,
            profile: data.profile,
          });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

router.post("/addResume/", jwtAuth, (req, res) => {
  const user = req.user;
  const data = req.body;
  let resume = new Resume({
    userId: user._id,
    basicInfo: data.basicInfo,
    skills: data.skills,
    education: data.education,
    expereince: data.expereince
  });

  resume
    .save()
    .then(() => {
      res.json({ data: "saved" })
    })
})

router.get("/findResume/", jwtAuth, (req, res) => {
  const user = req.user;
  Resume.findOne({ userId: user._id })
    .then((resume) => {
      if (resume == null) {
        res.status(200).json({
          message: "Job does not exist",
        });
        return;
      }
      res.json(resume);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err)
    });
})

router.put('/updateResume', (req, res) => {
  Resume.findOne({
    _id: req.body.id,
  })
    .then((resume) => {
      if (resume == null) {
        res.status(404).json({
          message: "Job does not exist",
        });
        return;
      }
      const data = req.body;
      if (data.basicInfo) {
        resume.basicInfo = data.basicInfo;
      }
      if (data.skills) {
        resume.skills = data.skills;
      }
      if (data.education) {
        resume.education = data.education;
      }
      if (data.expereince) {
        resume.expereince = data.expereince;
      }
      resume
        .save()
        .then(() => {
          res.json({
            message: "Resume details updated successfully",
          });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
})

router.get("/allResume/" , (req ,res) => {
  Resume.find()
  .then(data =>{
    res.json(data);
  })
  .catch((err)=>{
    res.status(400).json(err)
  })
})
module.exports = router;

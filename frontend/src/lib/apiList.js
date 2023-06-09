export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  adminLogin : `${server}/admin/adminlogin`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  examschedule: `${server}/api/examSchedule`,
  resume : `${server}/auth/addResume`,
  findResume : `${server}/auth/findResume`,
  updateResume : `${server}/auth/updateResume` , 
  allResume : `${server}/auth/allResume`
};

export default apiList;

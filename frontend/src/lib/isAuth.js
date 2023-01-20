const isAuth = () => {
  return localStorage.getItem("token");
};

export const userType = () => {
  return localStorage.getItem("type");
};

// export const subscriptionType = () => {
//   return localStorage.getItem("subscription");
// }

export default isAuth;

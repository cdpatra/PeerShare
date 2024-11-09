export const isAuthenticated = () => {
   if (localStorage.getItem("authData") === null) {
      return false;
   } else {
      return true;
   }
};

export const doAuthentication = (data) => {
   localStorage.setItem("authData", JSON.stringify(data));
};

export const doUnAuthentication = () => {
   localStorage.removeItem("authData");
};

export const getCurrentStudentDetail = () => {
   if (isAuthenticated()) return JSON.parse(localStorage.getItem("authData")).student;
   else return null;
};

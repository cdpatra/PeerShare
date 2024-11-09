import { sendRequest } from "./server-connectivity";

export const signUp = (student) => {
   return sendRequest.post("/auth/register", student).then((response) => response.data);
};

export const signIn = (usernamePassword) => {
   return sendRequest.post("/auth/login", usernamePassword).then((response) => response.data);
};

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { accessTokenSelector, setCredentials } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { toast } from "react-toastify";

function PersistentLogin() {
   const accessToken = useSelector(accessTokenSelector);
   const [isLoading, setIsLoading] = useState(true);
   const [requestRefreshToken] = useRefreshTokenMutation();
   const dispatch = useDispatch();
   useEffect(() => {
      if (!accessToken) {
         const getNewAccessToken = async () => {
            try {
               const result = await requestRefreshToken().unwrap();
               dispatch(setCredentials({ ...result }));
            } catch (error) {
               console.dir(error.data.error);
               let errorMessageFlag = false;

               if (error.data.message.includes("Refresh Token Expired !")) {
                  toast.error("Your Session is Expired !");
                  errorMessageFlag = true;
               }
               if (error.data.message.includes("Refresh Token not found with Refresh Token")) {
                  toast.error("You are Signed Out Automatically !!!");
                  errorMessageFlag = true;
               }
               if (!errorMessageFlag) toast.error(error.data.error);
            } finally {
               setIsLoading(false);
            }
         };
         getNewAccessToken();
      } else {
         setIsLoading(false);
      }
   }, [requestRefreshToken, dispatch, accessToken, isLoading]);
   return isLoading ? <div>Loading...</div> : <Outlet />;
}

export default PersistentLogin;

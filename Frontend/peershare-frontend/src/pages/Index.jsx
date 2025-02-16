import About from "./About";
import MainSection from "../components/MainSection";
import Contact from "./Contact";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Route, Routes } from "react-router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Index() {
   return (
      <>
         <NavBar />
         <Routes>
            <Route
               index
               element={
                  <>
                     <MainSection />
                     <About />
                     <Contact />
                     <Footer />
                  </>
               }
            />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
         </Routes>
      </>
   );
}

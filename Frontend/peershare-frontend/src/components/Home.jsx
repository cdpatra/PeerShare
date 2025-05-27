import About from "./About";
import CanvasBackground from "./CanvasBackground";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
   return (
      <>
         <div id="home" />
         <CanvasBackground />
         <div id="about" className="h-14"></div>
         <About />
         <div id="contact" className="h-14"></div>
         <Contact />
         <Footer />
      </>
   );
}

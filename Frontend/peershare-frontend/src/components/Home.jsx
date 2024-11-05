import About from "./About";
import CanvasBackground from "./CanvasBackground";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
   return (
      <>
         <div className="home-container bg-slate-400 dark:bg-primaryDark dark: text-textDark">
            <CanvasBackground />
            <About />
            <Contact />
            <Footer />
         </div>
      </>
   );
}

import logo from "../assets/images/logo.svg";
export default function Footer() {
   return (
      <div className="flex flex-col items-center gap-8  sm:flex-row bg-gray-950 p-4 justify-between">
         <div className="sm:basis-1/3  md:basis-1/5 text-center">
            <h2 className="text-logoGreen text-lg">About</h2>
            <p className="text-slate-400 text-sm">
               PeerShare is a knowledge-sharing platform where users can join groups, ask questions, and share
               resources. It&apos;s a great way to learn and connect with like-minded individuals.
            </p>
         </div>
         <div className="inline-grid justify-items-center order-1 sm:order-none">
            <a href="#" className="block flex-col justify-items-center scale-125">
               <img src={logo} alt="logo" className="h-12 mx-auto" />
               <div className="name flex flex-nowrap">
                  <span className="font-playWrite">PeerShare</span>
                  <span className=" inline-block text-logoGreen text-4xl -mt-4">.</span>
               </div>
            </a>
            <div className="copyright text-slate-400 mt-4 scale-75">Copyright &copy; {new Date().getFullYear()} PeerShare | All rights reserved</div>
         </div>
         <div className="sm:basis-1/3 md:basis-1/5 text-center">
            <h2 className="text-logoGreen text-lg">Important Links</h2>
            <ul className=" text-slate-400 text-sm">
               <li>
                  <a href="#">Home</a>
               </li>
               <li>
                  <a href="#">About</a>
               </li>
               <li>
                  <a href="#">Contact</a>
               </li>
               <li>
                  <a href="#">Sign In</a>
               </li>
               <li>
                  <a href="#">Sign Up</a>
               </li>
            </ul>
         </div>
      </div>
   );
}

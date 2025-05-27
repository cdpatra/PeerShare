export default function Contact() {
   return (
      <div className="flex flex-col justify-center items-center my-8">
         <h1 className="text-4xl font-bold my-4">Contact US</h1>
         <form
            action="https://formsubmit.co/chinam_cs_2021@rkgitm.ac.in"
            method="POST"
            name="Portfolio-contact-form"
            data-netlify="true"
            onSubmit="submit"
            data-netlify-honeypot="bot-field"
            className="max-w-2xl w-full z-20 relative backdrop-blur-sm bg-slate-700/15 dark:bg-white/5 rounded-lg p-10">
            {/* Netlify configuration for form submission */}
            <input type="hidden" name="form-name" value="peershare-contact-form" />
            <div hidden>
               <input name="bot-field" />
            </div>
            {/* Netlify configuration end's here */}
            <div className="mb-5">
               <label htmlFor="your-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
               </label>
               <input
                  type="text"
                  id="your-name"
                  name="Sender's Name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required={true}
                  placeholder="Enter your name"
                  autoComplete="off"
               />
            </div>

            <div className="mb-5">
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
               </label>
               <input
                  type="email"
                  id="email"
                  name="Sender's Email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter your email"
                  required={true}
                  autoComplete="off"
               />
            </div>

            <>
               <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Message
               </label>
               <textarea
                  id="message"
                  rows={4}
                  name="Message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your message here..."
                  defaultValue={""}
                  required={true}
                  autoComplete="off"
               />
            </>

            <div className="button-container flex justify-center">
               <button
                  type="submit"
                  className="text-white w-60 my-8  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Send Message
               </button>
            </div>
         </form>
      </div>
   );
}

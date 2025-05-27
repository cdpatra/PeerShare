export default function About() {
   return (
      <div>
         <h1 className="text-4xl text-center p-2 my-8 font-bold">About</h1>
         <div className="flex items-center">
            <div className="p-10 rounded-2xl w-1/2 flex flex-col gap-2 mx-4 text-neutral-300 bg-black/40">
               <p>
                  <span className="text-logoGreen">PeerShare</span> is a dynamic and collaborative learning platform designed to foster the exchange of
                  knowledge and skills among students and professionals. It empowers users to create and join
                  interest-based groups where they can post questions, engage in discussions, and share valuable
                  resources such as notes, playlists, study materials, and project ideas. Whether you're looking to
                  enhance your understanding of a subject, stay updated with trending topics, or simply connect
                  with like-minded learners, <span className="text-logoGreen">PeerShare</span> offers a supportive environment that encourages curiosity
                  and peer-to-peer learning.
               </p>
               <p>
                  The platform promotes active participation through community-driven features, making it easy for
                  users to find and follow relevant content, contribute their own insights, and build meaningful
                  connections. With tools that facilitate group collaboration, content ranking, and AI-assisted
                  note-taking, <span className="text-logoGreen">PeerShare</span> aims to make the learning experience more engaging, personalized, and
                  effective.
               </p>
               <p>
                  Whether you're a student trying to explore the best study materials, a junior seeking help from
                  seniors, or someone who wants to give back by mentoring others, <span className="text-logoGreen">PeerShare</span> is the perfect place to
                  learn, grow, and thrive together.
               </p>
            </div>

            <div className="w-1/2">
               <img src="/images/about-image.svg" alt="about-image" className="w-[90%]" />
            </div>
         </div>
      </div>
   );
}

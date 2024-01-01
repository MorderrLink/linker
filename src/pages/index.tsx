import { Inter as FontSans } from "next/font/google";
import Container from "~/components/Container";
import Header from "~/components/Header";
import SearchInput from "~/components/SearchInput";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function Home() {

  return (
    <Container direction="col"> 
      <Header/>
      <hr className="h-2 w-11/12 my-2 border-gray-400"/>      
      
      <SearchInput/>

      <div className="w-11/12 bg-slate-700 px-5 py-5 my-10 rounded-xl shadow-lg shadow-slate-600">
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-blue-300 ">What is Linker?</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col text-2xl text-white">
            <p>We all know that iconic scene from "American psyco" when businessmen are showing off their business cards</p>
            <br/>
            <p>What can this moment tell us?</p>
            <p className="text-blue-400">Everyone need some sort of "business card"!</p>
          </div>
          <img src="/AmericanPsycho.jpg" className="customBlob w-full lg:w-2/5" alt="LOAD ERROR..." />
        </div>

      </div>

      <div className="self-center">
        <h1 className="text-xl lg:text-4xl font-sans self-center text-neutral-300">Let me show you some examples:</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full justify-center px-14 py-4 ">

          <div className="bg-red-200 w-full flex flex-col items-center text-base lg:text-xl px-6 py-3 rounded-lg gap-3 shadow-lg shadow-red-200">
            <div className="flex flex-row items-center gap-2">
              <p>Imagine you are a bloger and you want to become very popular. You post videos or photos on different media platforms.</p>
              <img src="/smiling.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="😎" />
            </div> 
            <div className="flex flex-row-reverse items-center gap-2">
              <p>You already have a lot of subs on YouTube unlike Tweeter or Instagram. So, how do you tell your subs that you have accounts in other social networks?</p>
              <img src="/confused.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="🤨" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>You can tell them about other accounts using <span className="text-sky-500">Link</span><span className="text-sky-300">er</span>!</p>
              <img src="/happy.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="😀" />
            </div>
          </div>
        
          <div className="bg-cyan-100 w-full flex flex-col items-center text-xl px-4 py-2 rounded-lg gap-3 shadow-lg shadow-cyan-100">
            <div className="flex flex-row-reverse items-center gap-2">
              <p>Imagine you are a PR manager.</p>
              <img src="/smiling.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="😎" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>You need to manage lots of social media accounts of your boss or company. It will be pretty easy to forget about one of them.</p>
              <img src="/confused.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="🤨" />
            </div>
            <div className="flex flex-row-reverse items-center gap-2">
              <p><span className="text-sky-500">Link</span><span className="text-sky-300">er</span> can help you with storing all the neccesary links and providing your with quick access to them.</p>
              <img src="/happy.png" className="w-12 h-12 md:w-24 md:h-24 lg:w-40 lg:h-40" alt="😀" />
            </div>
          </div>

        </div>
    </Container>
  );
}


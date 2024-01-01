import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type SearchUserProps = {
    id: string; 
    image: string;
    user: string;
}

export default function SearchUser({image, user}:SearchUserProps) {
  return (
    <div className="w-full lg:w-11/12 h-auto flex flex-col px-1 lg:px-4">
        <Link className="flex flex-row items-center justify-between px-5 py-2 bg-neutral-700 rounded-xl shadow-lg" href={`/links/${encodeURI(user)}`}>
            <div className="flex flex-row ">
                <img className="rounded-full w-7 h-7 lg:w-14 lg:h-14" src={image} alt="" />
                <h1 className="w-full lg:w-10/12 md:w-9/12 flex items-center px-4  text-sm lg:text-xl text-sky-500 font-medium ">{user.length < 15 ? user : user.slice(0,13)+".."}</h1>
            </div>
            <IoIosArrowForward className="w-6 h-6 text-sky-500"/>
        </Link>
    </div>
  )
}

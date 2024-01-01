import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type SearchUserProps = {
    id: string; 
    image: string;
    user: string;
}

export default function SearchUser({image, user}:SearchUserProps) {
  return (
    <div className="w-10/12 h-auto flex flex-col px-4">
        <Link className="flex flex-row items-center justify-between px-5 py-2 bg-neutral-700 rounded-xl shadow-lg" href={`/links/${encodeURI(user)}`}>
            <div className="flex flex-row ">
                <img className="rounded-full w-14 h-14" src={image} alt="" />
                <h1 className="w-full lg:w-10/12 md:w-9/12 flex items-center px-4   text-xl text-sky-500 font-medium ">{user}</h1>
            </div>
            <IoIosArrowForward className="w-6 h-6 text-sky-500"/>
        </Link>
    </div>
  )
}

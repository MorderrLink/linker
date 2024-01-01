import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Header() {
    const session = useSession()
    
  return (
    <div className="w-full px-8 py-1 flex items-center lg:justify-start justify-between">
        <h1 className="text-4xl">
            <span className="text-sky-500">Link</span><span className="text-sky-300">er</span>
        </h1>
        <div className="h-min w-min flex lg:hidden items-center justify-center ">
            <Popover>
                <PopoverTrigger ><RxHamburgerMenu className="h-6 w-6 text-neutral-300"/></PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-2 items-start px-1 py-3">
                        <div className="flex flex-row w-full">

                        {session.data?.user.image &&
                         <div className="flex flex-row gap-5 w-full">
                            <img className="rounded-full w-12 h-12" src={session.data?.user.image} alt="DTA" />
                            <Link className="w-3/5 border-b-2" href={`/settings/${session.data.user.name}`}>
                                <h1>{session.data.user.name}</h1>
                                <p className="text-gray-500">Account settings</p>
                            </Link>
                         </div>
                        }
                        </div>
                        <div className="flex flex-row gap-3 w-full justify-center">
                            <Link className="px-2 border-r-2" href="/">Home</Link>

                            <Link href={`/links/${session.data?.user.name}`}>Your Links</Link>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}

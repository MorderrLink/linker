import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu";

export default function Navbar() {
    const session = useSession()

  return (
    <NavigationMenu className="sticky top-0 right-0 justify-start items-center flex flex-col mx-1 gap-1.5 py-2 ">
        {session.data?.user.image && 
        <div className="flex items-center justify-center">
            <Link href={`/settings/${session.data?.user.name}`} className=" border-white border-solid border-2 rounded-full shadow-2xl">
                <img src={session.data?.user.image} className="w-16 h-16 rounded-full"/>
            </Link>
        </div> }
        <Link href={`/`} legacyBehavior passHref className="shadow-2xl">
            <NavigationMenuLink className={`w-max ${navigationMenuTriggerStyle()}`}>
                Home
            </NavigationMenuLink>
        </Link>
        <Link href={`/links/${session.data?.user.name}`} legacyBehavior passHref className="shadow-2xl">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Your Links
            </NavigationMenuLink>
        </Link>
        { session.status === "authenticated" 
        ? <Button variant={"outline"} className="border-neutral-300 bg-neutral-900 text-neutral-300" onClick={() => {void signOut()}}>SignOUT</Button>
        : <Button variant={"outline"} onClick={() => {void signIn()}}>SignIN</Button>}
    </NavigationMenu>
  )
}

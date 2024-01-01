import { useRouter } from "next/router";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { IoArrowBack } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Skeleton } from "~/components/ui/skeleton";




export default function UserLinks() {
  const router = useRouter();
  const name = typeof router.query.name === "string" ? router.query.name : ""
  const session = useSession()

  let {data: user} = api.profile.getProfileByName.useQuery({name})


  const [newUsername, setNewUserName] = useState<string>("")
  const newUsernameRef = useRef<HTMLInputElement | null>(null)
  if (newUsername === undefined) {
    setNewUserName("")
  }

  const getUnique = api.user.getUserByName.useQuery({name: newUsername}).data;
  const nameChange = api.user.changeName.useMutation()

  const validateUsername = () => {
    if (newUsername === undefined) return 'User must have a username!';
    if (newUsername.length === 0) return 'User must have a username!';
    if (newUsername.length > 25) return 'This username is too long. Think of another one!';
    if (getUnique != null) return 'User with this username already exists!';
    return true;
   };



  function handleSubmit() {
    if (newUsernameRef.current) {
      setNewUserName(newUsernameRef.current.value)
      const result = validateUsername()
      if (result === true) {
        console.log("sending request...")
        if (session.data?.user.name == undefined || session.data?.user == undefined) return  
        
        nameChange.mutate({username: newUsername, prevName: session.data.user.name})

      } else {
        toast.error(result)
      }
      
    }
  }



  useEffect(() => {
    if (session.data?.user && session.data.user.name !== name) {      
      void router.push('/')


      toast("You are not allowed to acces the page this way!", {
        action: {
          label: "Got it",
          onClick: () => { toast.dismiss() }
        }
  
      })
    } else if (session && session.status != "authenticated") {
      void router.push('/')


      toast("You need to Sign in first!", {
        action: {
          label: "Login",
          onClick: () => { void signIn() }
        }
  
      })
    }
  }, [session])



  return (
    <Container direction="col" classNames="bg-neutral-900">
      <Header/>
      <hr className="h-2 w-11/12 my-2 border-gray-400"/>
      <div className="w-full flex items-center justify-between px-10 py-4 ">
        <Button onClick={() => { router.back() }}>
          <IoArrowBack />
        </Button>
        <h1 className="text-xl font-semibold text-neutral-300">Account settings</h1>
      </div>
      <div className="flex flex-col items-center">
        {(session.data?.user && session.data.user.name !== name) 
        ? <div className="w-screen h-screen z-20 bg-neutral-900"></div>
        : <div>
            {!(user) 
            ? <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-5 rounded-lg w-[200px]"/>
              </div>
            : <div className="flex flex-col items-center">
                <img src={`${user?.image}`} className="rounded-full" alt="" />
                <p className="text-2xl font-semibold text-neutral-300 ">{user?.name || "loading..."}</p>
              </div>}
          </div>
        }
        
      </div>

      <Container direction="col" classNames="px-4 py-10" wid="lg:w-5/6">
        
        <div className="w-full flex flex-col gap-5">
          
          <div className="flex flex-row gap-10 items-center justify-around ">
            <h3 className="text-xl w-2/6 text-neutral-300 ">Your Email</h3>
            <Input disabled placeholder={`${user?.email ?? "loading..."}`} className="w-3/6"/>
          </div>
          
          <div className="flex flex-row gap-10 items-center justify-around">
            <h3 className="text-xl w-2/6 text-neutral-300 ">Your Username</h3>
            <div className="flex flex-row gap-2 w-3/6">
              <Input disabled placeholder={`${user?.name ?? "loading..."}`} />
              <Dialog>
                <DialogTrigger>
                  <img className="w-6 lg:w-7 h-5 lg:h-6" src="/edit.png" alt="Edit" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle >Change your username</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-row gap-1">
                        <Input type="text" ref={newUsernameRef} onChange={() => {setNewUserName(newUsernameRef?.current?.value ?? "")}} placeholder="Enter new name"/>
                        <DialogClose asChild>
                          <Button type="submit" onClick={handleSubmit}>Change</Button>
                        </DialogClose>
                        
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>


        </div>
        
      </Container>
    </Container>

    
  )
}
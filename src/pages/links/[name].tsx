import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import checkDomain from "~/utils/domains";
import NewLink from "~/components/NewLink";
import { signIn, useSession } from "next-auth/react";
import GroupComponent from "~/components/GroupComponent";
import { toast } from "sonner";
import { Skeleton } from "~/components/ui/skeleton";

export default function UserLinks() {
  const session = useSession()
  const [links, setLinks] = useState<LabelUrlObject[]>([])
  const [newlinkIndex, setnewlinkIndex] = useState(0)
  
  type LabelUrlObject = {
    index: number;
    label: string;
    url: string;
   };

  const router = useRouter();
  let name = typeof router.query.name == "string" ? router.query.name : "";

  const {data: user} = api.profile.getProfileByName.useQuery({ name: name }, {enabled: typeof name === "string"} )

  

  const userId = user?.id || ""

  const LinksAndGroups = api.link.getByAuthorId.useQuery({id: userId}).data


  

  const newLinkRef = useRef<HTMLInputElement | null>(null);
  const groupNameRef = useRef<HTMLInputElement | null>(null);

  

  function addLink() {
    const newLink = newLinkRef?.current?.value
    if (newLink == undefined) return
    if (!isValidHttpUrl(newLink)) {
      if (newLinkRef.current) {
        newLinkRef.current.value = ""
      }
      toast.warning("Invalid url!")
      return
    }
    const imgDomeinPath = checkDomain(newLink)

    setLinks(oldArray => [...oldArray, {index: newlinkIndex, label: imgDomeinPath, url: newLink}])
    setnewlinkIndex(prevIndex => prevIndex + 1)
    if (newLinkRef.current) {
      newLinkRef.current.value = ""
    }
  }

  function deleteLink(index: number) {
    setLinks(links => links.filter(link => link.index != index))
  }

  




  const createGroup = api.link.createLinksGroup.useMutation()
  const addLinkToGroup = api.link.addLinkToGroup.useMutation()

  function isValidHttpUrl(string:string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!groupNameRef.current || groupNameRef.current.value == "") return
    // here add to db
    if (session.data?.user.id == undefined) return
    const groupId = await createGroup.mutateAsync({title: groupNameRef.current.value, authorId: session.data?.user.id})
    links.map(link => {
        addLinkToGroup.mutate({ url: link.url, groupId: groupId.id, iconPath: link.label})
    })
    setLinks([])
    newLinkRef.current = null
    setTimeout(() => {
      router.reload()
    }, 300)
  }

  const isOwner = session.data?.user.name == name
  
  useEffect(() => {
    if (session.data && session.status !== "authenticated") {
      router.push('/')


      toast("You need to Sign in first!", {
        action: {
          label: "Login",
          onClick: () => { void signIn() }
        }
  
      })
    } else if (!session) {
      console.log("session loading.. ")
    }
  }, [session])

  return (
    <Container direction="col">
      <Header/>
      <hr className="h-2 w-11/12 my-2 border-gray-400"/>
      <div className="w-full flex items-center justify-between px-10 py-4 ">
        <Button onClick={() => { router.back() }}>
          <IoArrowBack />
        </Button>
        {isOwner 
        ? <h1 className="text-xl font-semibold text-neutral-300">Your Links</h1>
        : <h1 className="text-xl font-semibold text-neutral-300">{name}</h1>
        }
        
      </div>


      <div className="flex flex-col py-4">
      {isOwner
      
      ? <Dialog>
          <DialogTrigger className="bg-neutral-800 px-4 py-2 m-2 rounded-lg text-neutral-300 hover:bg-neutral-600 transition-all">Create New Link Group</DialogTrigger>
          <DialogContent className="bg-neutral-900 text-neutral-300">
            <DialogHeader>
              <DialogTitle>New Link Group</DialogTitle>
              <DialogDescription className="flex flex-col gap-5 ">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-start justify-center">
                    <h1 className="text-lg font-normal">Name this group</h1>
                    <Input ref={groupNameRef} type="text" className="text-black font-medium text-lg" placeholder="My social links"/>
                  </div>
                  <div className="flex flex-row justify-around items-center">
                    <Input className="text-lg font-medium text-black" ref={newLinkRef} type="url" placeholder="Enter new url"/>
                    <Button type="button" onClick={addLink}>Add Link</Button>
                  </div>
                  {links.length > 0 && links.map((link) => {
                    return (
                      <NewLink key={link.url} label={link.label} url={link.url} onClick={() => {deleteLink(link.index)}}/>
                      )
                    })}
                  <Button className="text-neutral-100" disabled={links.length<1} type="submit"><DialogClose>Create Group</DialogClose></Button>
                </form>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        : <img className="w-24 h-24 rounded-full" src={user?.image || ""} alt={name} />
      }
      
      </div>

      {(!LinksAndGroups)
      ? <div className="flex flex-col gap-5">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] lg:w-[350px]" />
              <Skeleton className="h-4 w-[200px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] lg:w-[350px]" />
              <Skeleton className="h-4 w-[200px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] lg:w-[350px]" />
              <Skeleton className="h-4 w-[200px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] lg:w-[350px]" />
              <Skeleton className="h-4 w-[200px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] lg:w-[350px]" />
              <Skeleton className="h-4 w-[200px] lg:w-[300px]" />
            </div>
          </div> 
         
          
        </div>
      : <div className="flex flex-col gap-5 w-full lg:w-7/12">
          {LinksAndGroups?.map((group, index)=> {
            return (
              <GroupComponent manage={isOwner} key={index} title={group.title} authorId={group.authorId} links={group.links} groupId={group.id}/>
            )
          })}                
        </div>}              


    </Container>

    
  )
}




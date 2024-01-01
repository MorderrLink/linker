
import { useRouter } from "next/router"
import { IoArrowBack } from "react-icons/io5"
import Container from "~/components/Container"
import { useUrl } from "nextjs-current-url"
import Header from "~/components/Header"
import { Button } from "~/components/ui/button"
import { api } from "~/utils/api"
import { toast } from "sonner"
import Link from "next/link"
import { useSession } from "next-auth/react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import React, { useRef } from "react"


export default function Group() {
    
    const deleteRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    const isFollowed = router.query.followed || false
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const groupId = typeof router.query.id == "string" ? router.query.id : "";
    const authorName = typeof router.query.name == "string" ? router.query.name : "";
    const session = useSession()
    const authorId = api.user.getUserByName.useQuery({name: authorName}).data?.id
    const authorIdChecked = authorId == undefined ? "" : authorId

    const deletion = api.link.deleteGroupById.useMutation()
    const group = api.link.getGroupById.useQuery({authorId: authorIdChecked, id: groupId})
    const groupData = group.data
    if (groupData == null) return

    const isOwner = session.data?.user.name == authorName


    function copyPath() {
      if (currentUrl == undefined) return 
      navigator.clipboard.writeText(`${currentUrl}?followed=true`)
      toast.success("Link was copied to the clipboard")
    }

    const deviceWidth = window.innerWidth
    let sliceEnd:number
    if (deviceWidth < 600) {
      sliceEnd = 15  
    } else if (deviceWidth > 600 && deviceWidth < 1000) {
      sliceEnd = 22
    } else if ( deviceWidth > 1000 && deviceWidth < 1200){
      sliceEnd = 25
    } else {
      sliceEnd = 30
    }



    function handleDelete(e:React.FormEvent) {
      e.preventDefault()
      if (deleteRef.current?.value === groupData?.title) {
        console.log("Group with name", groupData?.title, "was deleted")
      }
    }


    function deleteGroup() {
      toast.info(`Group with name ${groupData?.title} was deleted`)
      deletion.mutate({id: groupId})
      setTimeout( () => {
        router.push(`/links/${authorName}`)
      }, 1000 )
    }

  return (
    <Container classNames="px-1 gap-2 shadow-2xl" direction="col">
        <Header/>
      <hr className="h-2 w-11/12 my-2 border-gray-400"/>
      <div className="w-full flex items-center justify-between px-10 py-4 ">
        <Button className={ `shadow-2xl ${isFollowed ? "hidden" : ""}`} onClick={() => { router.back() }}>
          <IoArrowBack/>
        </Button>
        <h1 className="text-xl font-semibold text-white">{!!groupData ? groupData.title : ""}</h1>
      </div>

      {(!groupData) 
      ? <div className="w-full flex items-center justify-center">
          <h1 className="font-medium text-neutral-300">Loading...</h1>
        </div>

      : <div className="w-full md:w-7/12 lg:w-1/3 flex flex-col px-5 py-4 gap-2 bg-neutral-800 rounded-md text-neutral-300">
        
          {isFollowed 
          ? <div className="px-5 py-2">
              <h1 className="text-xl font-medium">{authorName} : <span className="text-sky-500">{groupData.title}</span></h1>
            </div>
          : authorName === session.data?.user.name 
          ? <div className="flex flex-row items-center justify-between px-5 py-4">
              <h1 className="font-medium text-xl">Share this group</h1>
              <Button className="shadow-2xl" variant={"secondary"} onClick={() => { copyPath() }}>Copy Link</Button>
            </div> 
        : <div className="px-5 py-2">
            <h1 className="text-xl font-medium">{authorName} : <span className="text-sky-500">{groupData.title}</span></h1>
          </div>}
      
          {groupData.links.map(link => {
            return (<div className="flex flex-row items-center justify-between px-5 py-4 gap-2" key={link.id}>
              <img className="w-6 h-6 lg:w-10 lg:h-10" src={link.iconPath} alt="..." />
              <p>{link.url.length > 20 ? link.url.slice(0, sliceEnd)+"..." : link.url}</p>
              <Button><Link href={link.url} className="text-lg rounded-md p-0.5 text-white shadow-2xl" target="_blank">Follow</Link></Button>
              </div>)
          })}
        </div>}
        {isOwner && 
        <div className="w-full md:w-7/12 lg:w-1/3  flex flex-row items-end justify-evenly px-5 py-4 gap-2  rounded-md text-neutral-300">  
          <h4 className="text-neutral-400 text-balance">if you don't need this group any more you can</h4>
          
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"} size={"default"} className="bg-transparent text-red-600 hover:bg-red-700 hover:text-white border-red-600">
                Delete this group            
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handleDelete} className="flex flex-col gap-2">
                    This action cannot be undone. This will permanently delete this group
                    and remove data from our servers.
                    <h1 className="font-medium text-lg text-slate-700">Type in <span className="font-bold text-black">{groupData.title}</span> to confirm</h1>
                    <Input ref={deleteRef}/>
                    <DialogClose asChild>
                      <Button type="submit" className="w-full" onClick={ deleteGroup }>Delete</Button>
                    </DialogClose>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>}
        
    </Container> )
}

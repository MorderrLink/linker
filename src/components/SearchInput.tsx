import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { VscSearch } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
 
import { Skeleton } from "~/components/ui/skeleton"
import SearchItem from "./SearchItem";
import SearchUser from "./SearchUser";

type SearchGroupProps = {
  title: string;
  id: string;
  author: {
      id: string;
      name: string;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      isProfilePrivate: boolean;
      isAdmin: boolean;
      isBanned: boolean;
  };
}

type SearchUserProps = {
  name: string;
  id: string;
  image: string | null;
}

export default function SearchInput() {

  const [selectedTab, setSelectedTab] = useState<"groups" | "users">("groups")
  const [searchQuery, setSearchQuery] = useState("")
  const [popover, setPopover] = useState<boolean>(false)
  useEffect(() => {
    if (searchQuery == "") {
      setPopover(false)
    }
  }, [searchQuery])

  const Search = api.search.getSearched.useQuery({query: searchQuery}).data

  const SearchedGroups : SearchGroupProps[] = Search?.groups ?? []
  const SearchedUsers : SearchUserProps[] = Search?.users ?? []


  const router = useRouter()
  
  const onSearch = (e:React.FormEvent) => {
    e.preventDefault()

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`/?q=${encodedSearchQuery}`)

  }
  
  return (

      <form className="flex flex-col w-10/12 items-center" onSubmit={onSearch}>  
        <div className="flex flex-row h-max w-10/12 max-w-lg items-center space-x-2 relative">
          <Input
          className="rounded-xl" 
          value={searchQuery}
          onChange={(e) => { 
            setSearchQuery(e.target.value)
            setPopover(true)
            
            }}
          type="text" 
          placeholder="Search for links"
          />
          <Button variant={"outline"} type="submit" className="rounded-xl"><VscSearch/></Button>
        </div>
       
        <div className={` w-10/12 lg:w-2/6 h-max top-32 flex flex-col items-center justify-center bg-neutral-800 rounded-lg px-4 py-2 shadow-2xl ${popover ? "absolute" : "hidden"}`}>
          <div className="w-full flex flex-row justify-evenly items-baseline text-neutral-300 font-medium px-2 py-1">
            <h1 onClick={() => {setSelectedTab("groups")}}  className={`${selectedTab === "groups" ? "text-sky-500 text-2xl" : "text-xl text-neutral-300" } cursor-pointer px-2 py-2`}>Groups</h1>
            <h1 onClick={() => {setSelectedTab("users")}} className={`${selectedTab === "users" ? "text-sky-500 text-2xl" : "text-xl text-neutral-300"}  cursor-pointer px-2 py-2`}>Users</h1>
          </div>
            
          {selectedTab === "groups"
          ? <div className="w-full">
              {(SearchedGroups.length > 0) 
              ? <div className="flex flex-col w-full items-center justify-start gap-3">
                  {SearchedGroups.map((item:SearchGroupProps) => {
                    return <SearchItem key={item.id} id={item.id} author={item.author.name} title={item.title}/>
                    })}
                </div>
              : 
              <div className="flex w-full flex-col max-w-full justify-start items-center px-0 lg:px-5">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[220px] md:w-[300px] lg:w-[350px] max-w-10/12 lg:max-w-1/6" />
                  <Skeleton className="h-4 w-[180px] md:w-[250px] lg:w-[300px] max-w-10/12 lg:max-w-1/6" />
                </div>
              </div>
            }
            </div>
          : <div className="w-full">
              {(SearchedUsers.length > 0) ? 
                <div className="flex flex-col w-full items-center justify-start gap-3">
                  {SearchedUsers.map((user:SearchUserProps) => {
                    return <SearchUser key={user.id} id={user.id} user={user.name} image={user.image ?? ""}/>
                    })}
                </div>
              : 
              <div className="flex w-full flex-col max-w-full justify-start items-center px-0 lg:px-5">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[220px] md:w-[300px] lg:w-[350px] max-w-10/12 lg:max-w-1/6" />
                  <Skeleton className="h-4 w-[180px] md:w-[250px] lg:w-[300px] max-w-10/12 lg:max-w-1/6" />
                </div>
              </div>
              }
            </div>
          }
            
            










            
        </div>

      </form>

  )
}

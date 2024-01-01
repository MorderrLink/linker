import Link from "next/link";
import LinkComponent from "./LinkComponent";
import { Button } from "./ui/button";
import { api } from "~/utils/api";

type linkProps = {
    id: string;
    groupId: string;
    url: string;
    iconPath: string;
}

type groupComponentProps = {
    title: string;
    authorId: string;
    groupId: string;
    links: linkProps[];
    manage: boolean;
}

export default function GroupComponent({title, links, groupId, authorId, manage}: groupComponentProps) {
  const authorName = api.user.getUserById.useQuery({id: authorId})

  return (
    <div className=" w-full flex flex-col flex-wrap px-5 pt-2 pb-4 items-start justify-start bg-neutral-800 text-neutral-300 rounded-2xl gap-3">
        <h1 className="tracking-wider text-xl font-medium text-sky-500">{title}</h1>
        {links.map((link) => {
            return <LinkComponent key={link.id} url={link.url} iconPath={link.iconPath} />
        })}
        <Button size={"lg"} className={`rounded-lg bg-neutral-900 hover:bg-stone-700 tracking-wide text-lg ${!manage && "hidden"}`}>
          <Link href={`${authorName.data?.name}/group/${groupId}`}>
            Manage
          </Link>
        </Button>
    </div>
  )
}

 
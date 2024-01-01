import Link from "next/link";

type SearchItemProps = {
    title: string;
    id: string;
    author: string;
  }

export default function SearchItem({id, title, author}: SearchItemProps) {
  return (
    <div className="w-10/12 h-auto flex flex-col px-4">
        <Link className="flex flex-col -space-y-1" href={`/links/${encodeURI(author)}/group/${id}`}>
            <h1 className="bg-neutral-700 rounded-xl w-full lg:w-10/12 md:w-9/12 px-2 py-1 z-10  text-sky-500 font-medium shadow-lg">{title}</h1>
            <h5 className="bg-neutral-600 rounded-xl w-11/12 lg:w-8/12 md:w-7/12 px-2 py-1 text-neutral-400 font-medium shadow-lg">@{author}</h5>
        </Link>
    </div>
  )
}


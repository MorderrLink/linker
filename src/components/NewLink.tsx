import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdDelete } from "react-icons/md";
type newLinkProps = {
    label: string;
    url: string;
    onClick?: () => void;
}

export default function NewLink({label,url, onClick}: newLinkProps) {
  return (
    <div className="flex flex-row gap-3 items-center my-5">
        <img className="w-11 h-11" src={label} alt={label} />
        <Input disabled placeholder={url}/>
        <Button type={"button"} size={"sm"} onClick={onClick}><MdDelete/></Button>
    </div>
  )
}
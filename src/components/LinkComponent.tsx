import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { toast } from "sonner";
import { PiCopySimpleBold } from "react-icons/pi";

type LinkComponentProps = {
    url: string;
    iconPath: string;
}

export default function LinkComponent({url, iconPath}: LinkComponentProps) {

  const deviceWidth = window.innerWidth
  let sliceEnd
  if (deviceWidth < 600) {
    sliceEnd = 15  
  } else if (deviceWidth > 600 && deviceWidth < 1000) {
    sliceEnd = 22
  } else if ( deviceWidth > 1000 && deviceWidth < 1200){
    sliceEnd = 25
  } else {
    sliceEnd = 30
  }

  return (
    <div className="flex w-full flex-row items-center bg-neutral-500 text-black rounded-lg justify-between px-6 py-1 gap-3">
        <div className="flex flex-row items-center gap-5">
          <img className="w-10 h-10 lg:w-16 lg:h-16" src={iconPath} alt="ERROR" />
          <p className="lg:text-2xl font-normal tracking-wide">{url.length > 20 ? url.slice(0, sliceEnd)+"..." : url}</p>
        </div>
        <div className="flex flex-row items-center mx-3 gap-3">
            <Link href={url} className="text-lg lg:text-3xl bg-neutral-800 rounded-md p-0.5 text-neutral-300" target="_blank"><HiExternalLink/></Link>
            <h1 className="text-lg lg:text-3xl  cursor-pointer bg-neutral-800 rounded-md p-0.5 text-neutral-300" onClick={async () => {
                await navigator.clipboard.writeText(url)
                toast.info("Link copied to the clipboard")
            }}><PiCopySimpleBold className="text-netural-300"/></h1>
        </div>
    </div>
  )
}

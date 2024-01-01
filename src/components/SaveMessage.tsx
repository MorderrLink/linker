import { NextRouter } from "next/router";
import { Button } from "./ui/button";

type routerType = {
    router: NextRouter;
}

export default function SaveMessage({router}: routerType) {
  return (
    <div className="flex flex-row w-full items-center justify-between px-5 py-2">
        <p>Save changes!</p>
        <Button className="bg-green-500 text-lg outline-none" onClick={() => { router.reload() }}>Save</Button>
    </div>
  )
}

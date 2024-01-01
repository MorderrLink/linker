import React from "react"


type ContainerProps = {
    children?: React.ReactNode;
    direction: string;
    classNames?: string;
    bg?: string;
    wid?: string;
}

export default function Container({children, direction, classNames, bg, wid}: ContainerProps) {
  return (
    <div className={`h-auto w-screen min-h-screen ${wid ? wid : " lg:w-3/5"} flex  flex-${direction == "col" ? "col items-center " : "row justify-center "} py-5 ${classNames} overflow-x-hidden ${bg ? bg : "bg-neutral-900"}`} >
      {children}
    </div>
  )
}

import React from 'react'

type WhiteSpaceProps = {
    children?: React.ReactNode;
}

export default function WhiteSpace({children}: WhiteSpaceProps) {
  return (
    <div className='h-auto w-1/5 min-h-screen hidden lg:flex justify-end bg-neutral-900'>
       {children} 
    </div>
  )
}

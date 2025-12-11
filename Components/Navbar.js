import React from 'react'
import Link from 'next/link'
import menu from '@/app/Menu/page' 

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full text-black   py-4 '>
      <div className='relative'>
        <Link href="/">

          <img className='rounded-full relative left-3.5' src="main.jpg" alt="" width={85} height={85} /></Link>
      </div>

      <ul className='flex gap-8 text-3xl px-5 cursor-pointer font-bold'>
        <Link href="/Menu">Menu</Link>
        <Link href="/Payment">Total</Link>


      </ul>



    </nav>
  )
}

export default Navbar
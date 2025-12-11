import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="w-full font-bold  text-black   py-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
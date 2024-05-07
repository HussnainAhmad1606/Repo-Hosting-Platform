import Link from 'next/link'
import React from 'react'

function HeroSection() {
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className='text-center'>
      <h1 className="text-5xl font-bold">Document Hosting Made Easy</h1>
      <p className="py-6">Host your documents with free and unlimited issues tracker and version controls</p>
      <Link href={"/signup"} className="btn btn-primary">Get Started</Link>
    </div>
  </div>
</div>
  )
}

export default HeroSection
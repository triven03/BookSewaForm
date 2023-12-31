import React from 'react'
import Link from 'next/link';

function hello() {
  return (
    <div className="demo-page">
        <main className="demo-page-content" id="main">
          
          <section className="container">
            <h1 className="center h1">
                आपका फॉर्म सबमिट हो गया हैं
            </h1>

            <div className='linkDiv'>
                <Link href="/" className="link">
                    Edit Your Responce
                </Link>

                <Link href="/" className="link">
                    Submit Another Responce
                </Link>
            </div>
           
          </section>
  
          <footer className="foot">Copyright &#169; 2023 Trivendra CG All Right Reserved</footer>
        </main>
      </div>
  )
}

export default hello
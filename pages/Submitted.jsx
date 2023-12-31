"use client";

import Link from 'next/link';
import React, {  useState,useEffect} from "react";
import { useRouter } from 'next/router';


export default function Submitted() {
  const [formData, setformData] = useState({});
  const router = useRouter();

  useEffect(() => {
    document.title = "Sewa Form";  
    const savedData = router.query.savedData;

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // console.log(parsedData.id);
      setformData(parsedData.id)
    }
  }, []);

    console.log(formData);
    const handleEditResponse = () => {
      router.push({
        pathname: '/',
        query: { formData: JSON.stringify(formData)},
      });
    };

  return (
    <div className="demo-page">
        <main className="demo-page-content" id="main">
          
          <section className="container">
            <h1 className="center h1">
                आपका फॉर्म सबमिट हो गया हैं
            </h1>

            <div className='linkDiv'>
                <div className="link" onClick={handleEditResponse}>
                    Edit Your Responce
                </div>

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


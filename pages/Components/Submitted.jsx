"use client";

import Link from 'next/link';
import React, {  useState,useEffect} from "react";
import { useRouter } from 'next/router';


export default function Submitted() {
  const [formData, setformData] = useState({});
  const router = useRouter();

  let year = new Date().getFullYear();

  useEffect(() => {
    document.title = "Book Sewa Form";  
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
    <div className="demo-page" id="mainPage">
        <main className="demo-page-content" id="main">
          
          <section className="container">
            <h1 className="center h1" id='dummyFormH1'>
                CG Book Sewa Form
            </h1>

            <h1 className="center h1">
                आपका फॉर्म सबमिट हो गया है
            </h1>
            <h3 className="center h3">
                कबीर, चलते मारग जो गिरै, ताको नाहिं दोस। 
            </h3>
            <h3 className="center h3">
                कहे कबीर बैठा रहै, ता सिर करड़े कोस।
            </h3>
            <h3 className="center h3">
              इसलिए सेवा के लिए प्रयास अवश्य करें।  
            </h3>
            <h2 className="center h2">
            सत साहेब जी...! 
            </h2>
          

            <div className='linkDiv'>
                <div className="link" onClick={handleEditResponse}>
                    Edit Your Response
                </div>

                <Link href="/" className="link">
                    Submit Another Response
                </Link>
            </div>
           
          </section>
  
          <footer className="foot">Copyright &#169; {year} CG Social Media All Right Reserved</footer>
        </main>
      </div>
  )
}


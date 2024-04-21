import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import SewaForm from './Components/SewaForm.jsx';
import Timer from './Components/Timer.jsx';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
      <title>Book Order Sewa Form</title>
      <meta name="description" content="CG Daily Book Order Sewa Report Form" />
      <meta property="og:title" content="Book Order Sewa Form" />
      <meta property="og:description" content="CG Daily Book Order Sewa Report Form" />
      <meta property="og:url" content="https://bookordersewaform.netlify.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/guruG.ico" />
      </Head>
      
      {/* <main className={`${styles.main} ${inter.className}`}> */}
      <main >
        
      {/* <SewaForm/> */}
      <Timer/>
      </main>
    </>
  )
}

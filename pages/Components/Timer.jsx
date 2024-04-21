import SewaForm from './SewaForm'
import React, { useEffect, useState } from 'react';

function Timer() {
//   const showFormTimeStart = "21:16:00"; // Example time: 07:00 PM
//   const showFormTimeEnd = "21:00:00"; // Example time: 09:00 PM

  const [showForm, setShowForm] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const year = new Date().getFullYear();

  useEffect(() => {

    const showFormTimeStart = 68400;  // 7pm  68400
    const showFormTimeEnd = 75666;   // 9pm   75660
    let fullTime= 86400;
      const currentTime = new Date();
      let h=currentTime.getHours();
      let m=currentTime.getMinutes();
      let s=currentTime.getSeconds();
  
      let totalTime = h*3600 + m *60 + s
      let count;

    if (showFormTimeStart < totalTime && totalTime < showFormTimeEnd) {
      // Display the form
      setShowForm(true);
    } else {
        if (totalTime< showFormTimeStart) {
          count=showFormTimeStart-totalTime;
          // console.log("if block ");
      
        }  
        else if(totalTime > showFormTimeEnd){
            // console.log("else if block ");
            count= totalTime-showFormTimeStart
            count = fullTime-count ;
        }
    
      setCountdown(count);
      // console.log("Set Countdo 1 ",countdown);
      // console.log("Set Countdowunn 1 ",count);

      // Update countdown every second
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
            if (prevCountdown <= 0) {
                setShowForm(true);
                clearInterval(this);

                return 0
              }
            // console.log("count in ",prevCountdown);
            return prevCountdown - 1
        });

      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, []);

  return (
    <div className="App">
      {showForm ? (
        <SewaForm/>
      ) : (
        
        <div className='timeWrapper'>
            <div className='Timer'>
              <h1 className='FormDec'>Form Comming Soon.. </h1>
              <div className="time">
                  <h2 className='Hour tim'>{Math.floor(countdown / 3600)>=10?Math.floor(countdown / 3600):"0"+Math.floor(countdown / 3600)} Hours </h2>
                  <h2 className='Min tim'>{Math.floor((countdown / 60)%60)>=10?Math.floor((countdown / 60)%60):"0"+ Math.floor((countdown / 60)%60)} Minutes</h2>
                  <h2 className='Sec tim'>{Math.floor(countdown % 60)>=10?Math.floor(countdown % 60):"0"+ Math.floor(countdown % 60)} seconds</h2>
              </div>
              
            </div>
            <footer className='fotter'>Copyright &#169; {year} Trivendra CG All Right Reserved</footer>
        </div>
        
      )}
    </div>
  );
}

export default Timer;
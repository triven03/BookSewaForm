
import React, { useEffect, useState } from 'react';

function Timer() {
//   const showFormTimeStart = "21:16:00"; // Example time: 07:00 PM
//   const showFormTimeEnd = "21:00:00"; // Example time: 09:00 PM



  const [showForm, setShowForm] = useState(false);
  const [countdown, setCountdown] = useState(0);


  const showFormTimeStart = 68400;  //68400
  const showFormTimeEnd = 75600;   //75600

    const currentTime = new Date();
    let h=currentTime.getHours();
    let m=currentTime.getMinutes();
    let s=currentTime.getSeconds();

    let totalTime = h*3600 + m *60 + s
    let remn;
    if (totalTime< showFormTimeStart) {
        // isme time  7 baje ke pahle ka hai
        remn=showFormTimeStart-totalTime;
    }
    else if(totalTime>showFormTimeEnd){
        // isme time 9 baje ke bad ka hai 
        remn = 0
    }
    else{
        remn=totalTime-showFormTimeStart
    }


  useEffect(() => {


    if (showFormTimeStart <= totalTime && totalTime <= showFormTimeEnd) {
      // Display the form
      setShowForm(true);
    } else {
      // Calculate the countdown
    //   const countdownValue = Math.floor((showFormDate - currentTime) / 1000);
      setCountdown(remn);
      console.log("Set Countdo 1 ",countdown);
      console.log("Set Countdowunn 1 ",remn);

      // Update countdown every second
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
            if (prevCountdown <= 0) {
                setShowForm(true);
                clearInterval(this);

                return 0
              }
            console.log("count in ",prevCountdown);
            return prevCountdown - 1
        });

      }, 1000);

      // When countdown reaches zero, display the form and clear the interval
      
    
      return () => clearInterval(countdownInterval);
    }
  }, []);

  return (
    <div className="App">
      {showForm ? (
        <div>
          <h2>Your Form Goes Here</h2>
        </div>
      ) : (
        <div>
          <h2>Next Form in {Math.floor(countdown / 3600)} H : {Math.floor((countdown / 60)%60)} M :{countdown % 60} seconds</h2>
        </div>
      )}
    </div>
  );
}

export default Timer;
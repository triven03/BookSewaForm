import moment  from 'moment';


console.log("trivendra");

let time= new Date()
    // const formattedDate = moment(time).format('MM/DD/YYYY H:mm:ss');
    // const formattedDate = moment(time).format('l H:mm:ss');
    console.log("toUtc ",time.toUTCString());
    console.log("toTimeString ",time.toTimeString());
    console.log("toISOString ",time.toISOString());
    console.log("toDateString ",time.toDateString());
    console.log("toLocaleDateString ",time.toLocaleDateString());
    console.log("toLocaleString ",time.toLocaleString());
    console.log("toLocaleString ",time.toLocaleDateString());
    console.log("time",time);

const showFormTimeStart = 68400;  // 7pm  68400
const showFormTimeEnd = 75660;   // 9pm   75660
let fullTime= 86400;

const currentTime = new Date();

currentTime.setHours(22)
currentTime.setMinutes(10)
currentTime.setSeconds(20)

let h=currentTime.getHours();
let m=currentTime.getMinutes();
let s=currentTime.getSeconds();

console.log(currentTime.toDateString());
let totalTime = h*3600 + m *60 + s
let count;
if (totalTime< showFormTimeStart) {
    count=showFormTimeStart-totalTime;
    console.log("if block ");

}
else if(totalTime > showFormTimeStart && totalTime < showFormTimeEnd){
    console.log("Show FormS");

}

else if(totalTime > showFormTimeEnd){
    console.log("else if block ");
    count= totalTime-showFormTimeStart
    count = fullTime-count ;
}

console.log(Math.floor(count/3600), "H" ,Math.floor((count/60)%60),"M" ,count%60 , "S");
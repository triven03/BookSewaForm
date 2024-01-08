import moment  from 'moment';

const showFormTimeStart = 68400;
const showFormTimeEnd = 75600;

const currentTime = new Date();
let h=currentTime.getHours();
let m=currentTime.getMinutes();
let s=currentTime.getSeconds();

let totalTime = h*3600 + m *60 + s
let count;
if (totalTime< showFormTimeStart) {
    count=showFormTimeStart-totalTime;
}
else{
    count=totalTime-showFormTimeStart
}

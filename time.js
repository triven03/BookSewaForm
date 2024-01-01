import moment  from 'moment';

let tm= new Date();

let dt=new Date("01-01-2024")

const formattedDate = moment(tm).format('MM/DD/YYYY');
console.log(formattedDate);
console.log(typeof formattedDate);
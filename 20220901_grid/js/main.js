// 현재 년, 월, 일 알아내기
let today = new Date();

year = today.getFullYear();
month = today.getMonth();
date = today.getDate();
// 현재 월 마지막날?
let lastDate = new Date(year, month + 1, 0).getDate();//현재 달의 마지막날: 다음달의 0일
// 현재 월 1일은 무슨 요일?
let firstDay = new Date(year, month, 1).getDay();//firstDay = 4 -> 목요일
console.log(`${year}년 ${month+1}월 ${date}일 ${firstDay}, ${lastDate}`); 
console.log(today);
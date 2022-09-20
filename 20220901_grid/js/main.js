function test(){// 현재 년, 월, 일 알아내기
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
}
//오늘을 구하자
let today = new Date();
//오늘 연 구하자
let year = today.getFullYear();
//오늘 월 구하자
let month = today.getMonth(); 
month++;// 0~11
//오늘 일 구하자
let date = today.getDate();
//오늘 요일 구하자
let day = today.getDay();
let days = ['일','월','화','수','목','금','토'];
console.log(`${year}년 ${month}월 ${date}일 ${days[day]}요일`);
//1일 : (오늘 연, 오늘 월, 1) 객체 구하자
let firstDate = new Date(year, month - 1, 1);
//그 객체 요일 구하자
let firstDay = firstDate.getDay();
console.log(days[firstDate]);
//1일을 HTML -> JS
let firstDiv = document.getElementsByClassName("first")[0];
//grid-column-start: 요일 + 1;
firstDiv.style.gridColumnStart = firstDay + 1;
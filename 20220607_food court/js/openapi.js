//https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17320190722180924242823&infSeq=2
//시도 교육청 코드 : B10 :서울특별시 교육청
//표준학교코드 : 7010569 : 미림여자 정보과학고등학교
//식사 코드 : 2 : 중식

//신청주소 : https://open.neis.go.kr/hub/mealServiceDietInfo
//KEY : 4c1c34c714584bc7a03a150eb9ff1fe3	
//ATPT_OPFCDC_SC_CODE: 시도교육청코드
//SD_SCHUL_CODE : 표준학교코드
//MMEAL_SC_CODE : 식사코드
//MLSV_YMD : 급식시작일자
//MLSV_TO_YMD :  급식종료일자
//https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010569&MMEAL_SC_CODE=2&MLSV_YMD=20220927&Type=json
// const KEY = "4c1c34c714584bc7a03a150eb9ff1fe3";
// const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시 교육청
// const SD_SCHUL_CODE = "7010569"; // 미림여자정보과학고등학교
// let MMEAL_SC_CODE = 2;//중식
// let MLSV_YMD = "20220927";
// let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?`
//             +`KEYE=${KEY}`
//             +`ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
//             +`SD_SCHUL_CODE=${SD_SCHUL_CODE}`
//             +`MMEAL_SC_CODE=${MMEAL_SC_CODE}`
//             +`MLSV_YMD=${MLSV_YMD}`;
// // console.log(url);
// 실시간으로 급식메뉴 가져오자
//.date-grid-container>.grid-item에 마우스 올려놓으면(mouseover), handler 함수 호출하자
let dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");
const handler = (event) => {
    // console.log(year);
    // console.log(month);
    let date = event.target.innerHTML;
    // console.log(date);
    //handler에서 year, month, date, 식사 로 url 만들어서 AJAX로 급식 정보 가져오자
    const KEY = "4c1c34c714584bc7a03a150eb9ff1fe3";
    const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시 교육청
    const SD_SCHUL_CODE = "7010569";// 미림여자정보과학고등학교
    // let MMEAL_SC_CODE = 2;//중식
    let MLSV_YMD = `${year}${month.toString().padStart(2,"0")}${date.padStart(2,0)}`;
    // console.log(MLSV_YMD);
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?`
            +`?KEYE=${KEY}`
            +`&Type=json`
            +`&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
            +`&SD_SCHUL_CODE=${SD_SCHUL_CODE}`
            +`&MLSV_YMD=${MLSV_YMD}`;
            // +`MMEAL_SC_CODE=${MMEAL_SC_CODE}`
            
    console.log(url);
    urlToJSON(url);
}

const urlToJSON = (url) => {
    //XMLHttpRequest 객체 만들자
    let xhr = new XMLHttpRequest();

    //callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            //xhr.readyState(상태)가 준비가 되었고 xhr.status == 200 서버에 문서가 존재하면
            //success
            //console.log("성공"+xhr.response);
            showMenu(xhr.response);//xhr.response(응답하자)
        }else{
            //fail
            //console.log(xhr.status);
        }
    }

    //요청 보낼 방식 정하자 true : 비동기
    xhr.open("GET", url, true);

    //요청하자
    xhr.send();
    
    //json 받아서 HTML 보식, 중식, 석식에 출력하자
    const showMenu = (jsonString) => {
        console.log(jsonString);
        //jsonString -> json
        let json = JSON.parse(jsonString);
       // console.log(json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM']);
        try{
            if(json['mealServiceDietInfo'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000'){
            //응답이 제대로 왔으면
            //json -> HTML
                    let breakfastData = json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM'];
                    //(5.13.)삭제하자
                    breakfastData = breakfastData.replace(/\([0-9\.]*\)/g, ""); // 정규표현식 : (문자 숫자나 .문자)문자
                    // (                \()
                    // 숫자 한글자    [0123456789]
                    // .                \.
                    //0~n개             *
                    //)                 \)
                    // 글로벌           g
                    breakfast.innerHTML = breakfastData;
                    let lunchData = json['mealServiceDietInfo'][1]['row'][1]['DDISH_NM'];
                    lunchData = lunchData.replace(/\([0-9\.]*\)/g, "");
                    lunch.innerHTML = lunchData;
                    let dinnerData = json['mealServiceDietInfo'][1]['row'][2]['DDISH_NM'];
                    dinnerData = dinnerData.replace(/\([0-9\.]*\)/g, "");
                    dinner.innerHTML = dinnerData;
            }else{
                    //응답이 이상하면 없음 표시
                    breakfast.innerHTML = "없음";
                    lunch.innerHTML = "없음";
                    dinner.innerHTML = "없음";
            }
        }catch{ 
                    breakfast.innerHTML = "없음";
                    lunch.innerHTML = "없음";
                    dinner.innerHTML = "없음";
        }
    }
}

for( let gridItem of gridItems){
    gridItem.onmouseover = handler;
    //gridItem.addEventListener("mouseover",handler);
}
//다 가져왔으면, 조식, 중식, 석식 표시하자
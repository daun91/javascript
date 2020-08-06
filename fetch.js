// 현재 index.html에서 index 이후 fetch 가 script 파일로 불러와져있다
// 따라서 뒤에 불러온 fetch에서는 index의 변수들을 사용할 수 있다.

const API_KEY = "U1MWIB4VDT66YUSA";
const API_URL_APL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=APL&outputsize=full&apikey=U1MWIB4VDT66YUSA`;
const API_URL_IBM = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=U1MWIB4VDT66YUSA";
const API_LOCAL_IBM = "http://localhost:3035/";
// local에서 api 사용하면 CORS 이슈 있음
// npm i cors -D 및 const cors = require("cors"), app.use(cors())

let DATA_READY = false;

function printPrice(price){
    console.log(price);
}


// axios.get(API_URL_APL)
// .then(response=>{
//     return response.data["Time Series (Daily)"];
// })
// .then(response=>{
//     const keys = Object.keys(response);
//     // 여기서 왜 같은 값이 나오는지 알겠죠? 반복적으로 shift()를 해야함
//     const item = "2. high";
//     let data = {
//         y: [[response[keys.shift()][item]]]
//     };
//     //data를 지정하고 .y = [[response[keys.shift()][item]]] 라고 했으면 그 변수만 불러오는 것이지
//     // shift 명령어를 반복하는 것이 아니다.
    
//     setInterval(function(){
//         // printPrice(response[keys.shift()][whichToShow])
//         // while(keys.length>1)로 사용시 해당 조건 끝날 때까지 루프에서 벗어나지 않음
//         if(keys.length>1){
//             Plotly.extendTraces(chartDiv, {
//                 y : [[response[keys.shift()][item]]]
//             }
//             ,[0])
//         } else {
//             return false;
//         }
//         // Plotly.extendTraces(div, data, index)인데
//         // data는 {y : [[data1], [data2]....[]]}형태이고, index는 [0, 1, 2 ... ] 형태이다
//         // data 객체를 넘기되, y는 2차원 배열이다. 바깥 배열은 여러개의 트레이스에 적용시키 위함이며
//         // 안쪽 배열은 각 트레이스에 적용되는 데이터들의 배열. {y: [trace1, trace2...]}
//         // trace1 = [1, 3, 5 ...]
//     }, 200);
// });


axios.get(API_LOCAL_IBM)
.then(response => {
    console.log(response);
    return response.data["Time Series (Daily)"];
})
.then(response => {
    const keys = Object.keys(response);
    const valueLength = keys.length;
    const prices = keys.map((v, i) => response[v][ "2. high"]);
    Plotly.addTraces(chartDiv, {
        x: keys,
        y: prices,
        name: "IBM"
    });
})
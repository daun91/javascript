"strict mode"

function item1ClickHandler(event){
    const trace1 = {
        y: Array.from(new Array(elementsNumber), (_, i)=>Math.sin((i+1)*0.1)),
        type: "lines+markers"
    };
    const layout = {
        title: {
            text: "Hello world!",
            font: {
                size: 36
            }
        }
    };

    Plotly.addTraces(chartDiv, trace1);

    // Plotly.react(chartDiv, data, layout);
    //data 객체 새로 정의하여 update의 인자로 넘길시 아무 반응 없음
    //restyle할 경우 warning 뜨면서 업데이트 안됨, 기존 데이터 배열을 직접 수정해도 반영되지않는다.
    //plot할 경우 trace 하나 더 추가됨 (배열 길이 1일 경우 1개 이상은 추가 되지 않음, 2개 이상일 경우 계속 추가됨)
    //newPlot할 경우 기존 trace를 대체함
    //react할 경우 내가 원하는 대로, 새로운 data와 layout으로 replace함
};

function item2ClickHandler(event){
    const trace1 = {
        y: Array.from(new Array(elementsNumber), (_, i)=>Math.cos((i+1)*0.1)),
        type: "markers"
    };
    const layout = {};
    Plotly.addTraces(chartDiv, trace1);
};

function showCurrentItem(event){
    alert(currentItem.options[currentItem.selectedIndex].value);
};

function generateRandom(){
    return (Math.random()>0.5?1:-1) * Math.random();
}

function showItemPrice(event){
    const priceDiv = document.querySelector(".currentPrice");
    let currentPrice = document.createElement("span");
    currentPrice.innerText = "Hello world";
    priceDiv.appendChild(currentPrice); // array는 받을 수 없음
}

function appendRandomValues(event){
    // setInterval(appendRandomValues, 1000); 
    // 함수 내에서도 start 가능하나, 동일 함수일 경우 stack 된다

    let numberOfTraces = chartDiv.data.length;
    let numberOfData = chartDiv.data[0]["y"].length;

    // trace가 0 또는 1개 있을 때는 그 1개의 trace에만 추가하고 싶고,
    // 2개 이상의 trace가 있을 때 1번째 trace는 무시하고자 한다
    // numberOfTraces = (numberOfTraces==0)||(numberOfTraces==1)?numberOfTraces:numberOfTraces-1
    // let yData = new Array(numberOfTraces).fill([Math.random()]);
    // 위처럼 할 경우 random이 생성되는 대로 같은 랜덤 값이 배열에 입력된다
    let yData = new Array(numberOfTraces).fill(0).map(() => [(Math.random()>0.5?1:-1)*Math.random()]);
    let indicies = Array.from(new Array(numberOfTraces), (_, i)=>i);

    if(numberOfTraces>1){
        // indicies = indicies.shift();
        yData.splice(0, 1);
        indicies.splice(0,1);
    }
    Plotly.extendTraces(chartDiv, {
        y: yData
    }, indicies); 

    // 50이 넘을 경우 range를 50으로 지정
    let xRange = numberOfData>50?[numberOfData-50, numberOfData]:[0, numberOfData];

    const layout = {
        xaxis:{ range: xRange },
        yaxis:{ range: [-1,1] }
    };
    Plotly.relayout(chartDiv, layout);

    // y의 첫번째 값은 배열이여야 한다 > y자체는 2차 배열이어야한다.
    // extendTrace의 마지막 인자는 array of length 여야한다. int 오면 안됨
    
    // 기존 데이터에 x가 지정이 되어있으면, 위처럼 y만 추가했을 때 정상적으로 추가되지 않는다.
    // 위의 문장은 기존 데이터에 x가 지정이 안되어있을 경우에 사용
    // x 배열의 길이가 넉넉하다면 그 지정된 크기만큼 위의 문장으로 추가 가능

    // 만약 1 또는 2의 index를 가진 trace가 없다면 에러 발생 및 실행 불가
    // indices must be valid indices for gd.data.
}

const chartDiv = document.querySelector(".chart");
const btn1 = document.getElementById("addTrace");
const btn2 = document.getElementById("addAnotherTrace");
const btnShowCurrentItem = document.getElementById("showCurrentItem");
const currentItem = document.getElementById("itemsSelect");
const appendRandom = document.getElementById("appendRandom");

const selectItemBtn = document.getElementById("selectItem");


let intervalTriggered = false;

btn1.addEventListener("click", item1ClickHandler);
btn2.addEventListener("click", item2ClickHandler);
btnShowCurrentItem.addEventListener("click", showCurrentItem);
appendRandom.addEventListener("click", appendRandomValues);

selectItemBtn.addEventListener("click", showItemPrice);

// setInterval(appendRandomValues, 1000);

const elementsNumber = 100;
let trace = {
    // x: Array.from(new Array(elementsNumber), (_, i) => Math.sin((i+1)*0.1)),
    y: Array.from(new Array(elementsNumber), (_, i) => Math.sin((i+1)*0.1)),
    type: "lines+markers"
};

const layout = {
    title: {
        text: "유슬아 내 노트북에 진유슬 스티커 뜯기고 있어"
    },
    yaxis: {range:[0, 150]}
};

const data = [trace];
const emptyData = {
    y: [0],
    type:"lines+markers"
};
const config = {
    responsive: true
};
Plotly.newPlot(chartDiv, [{y:[]}], layout, config);
// plotly 객체가 제대로 initial 되지 않으면 gd.data must be an array 에러 발생할 수 있다
// data 객체는 반드시 array of objects

// Error: cannot extend missing or non-array attribute: y
// [{}] 아예 빈 객체를 data로 inital 하였을 때, extendTraces 정상동작 안함
// addTrace한다고 해서 y값이 설정되는 것이 아니다. initial 과정에서 y가 지정되어있어야함
// 즉 빈 그래프에 extendTraces 할 경우에는 y를 명시하되 빈 배열을 넘겨준다
// 빈 배열을 넘겨주더라도 addTraces에 의해 추가된 trace는 index 1을 가진다.



// Traces의 갯수를 알아내려면 chartDiv.data.length로 알 수 있다.
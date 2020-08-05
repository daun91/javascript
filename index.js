"strict mode"

function btn1ClickHandler(event){
    const trace1 = {
        x: Array.from(new Array(elementsNumber), (_, i)=>i+1),
        y: Array.from(new Array(elementsNumber), (_, i)=>Math.tan((i+1)*0.1)),
        type: "lines"
    };
    const trace2 = {
        x: Array.from(new Array(elementsNumber), (_, i)=>i+1),
        y: Array.from(new Array(elementsNumber), (_, i)=>Math.tan((i+1)*0.1)),
        type: "markers"
    };
    trace = {
        x: [1, 3, 5],
        y: [1, 10, 100],
        type: "markers"
    };
    const layout = {
        title: {
            text: "Hello world!",
            font: {
                size: 36
            }
        }
    }
    const data = [trace1, trace2];
    // let data = [trace];
    Plotly.react(chartDiv, data, layout);
    //data 객체 새로 정의하여 update의 인자로 넘길시 아무 반응 없음
    //restyle할 경우 warning 뜨면서 업데이트 안됨, 기존 데이터 배열을 직접 수정해도 반영되지않는다.
    //plot할 경우 trace 하나 더 추가됨 (배열 길이 1일 경우 1개 이상은 추가 되지 않음, 2개 이상일 경우 계속 추가됨)
    //newPlot할 경우 기존 trace를 대체함
    //react할 경우 내가 원하는 대로, 새로운 data와 layout으로 replace함
};

function btn2ClickHandler(event){

};

function showCurrentItem(event){
    alert(currentItem.options[currentItem.selectedIndex].value);
};

function generateRandom(){
    return (Math.random()>0.5?1:-1) * Math.random();
}

function clickRandomHandler(event){
    console.log("clicked");
    Plotly.extendTraces(chartDiv, {
        y: [[generateRandom()]] // y의 첫번째 값은 배열이여야 한다 > y자체는 2차 배열이어야한다.
    }, [0]); // 마지막 인자는 array of length 여야한다. int 오면 안됨
    // 기존 데이터에 x가 지정이 되어있으면, 위처럼 y만 추가했을 때 정상적으로 추가되지 않는다.
    // 위의 문장은 기존 데이터에 x가 지정이 안되어있을 경우에 사용
    // x 배열의 길이가 넉넉하다면 그 지정된 크기만큼 위의 문장으로 추가 가능
}

const chartDiv = document.querySelector(".chart");
const btn1 = document.getElementById("item1");
const btn2 = document.getElementById("item2");
const btnShowCurrentItem = document.getElementById("showCurrentItem");
const currentItem = document.getElementById("itemsSelect");
const appendRandom = document.getElementById("appendRandom");

btn1.addEventListener("click", btn1ClickHandler);
btn2.addEventListener("click", btn2ClickHandler);
btnShowCurrentItem.addEventListener("click", showCurrentItem);
appendRandom.addEventListener("click", clickRandomHandler);

const elementsNumber = 500;
let trace = {
    // x: Array.from(new Array(elementsNumber), (_, i) => Math.sin((i+1)*0.1)),
    y: Array.from(new Array(elementsNumber), (_, i) => Math.sin((i+1)*0.1)),
    type: "lines+markers"
};

const layout = {
    title: {
        text: "Hello world!"
    }
};

const data = [trace];
Plotly.newPlot(chartDiv, data, layout);
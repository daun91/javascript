// 함수 내의 함수를 선언하고, this를 통해 그 함수를 호출하는게 가능할까?

function printConsole(str){
    console.log(str+"==================");
}

function returnArray(){
    function printConsole(str){
        console.log(str);
    }

    //return this.printConsole("Hello!")
    return printConsole("Hello world");
}

returnArray();

// 함수 내에 함수 선언 및 호출 가능. 대신 this.는 사용불가. 
// 같은 함수 명을 가진 함수를 함수 외부에 정의했을 때, 내부의 함수를 호출한다.
// 같은 이름을 가진 외부의 함수는 별도로 호출하지 않는다
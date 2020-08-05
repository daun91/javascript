const API_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";

function printPrice(price){
    console.log(price);
}

axios.get(API_URL)
.then(response=>{
    return response.data["Time Series (Daily)"];
})
.then(response=>{
    const keys = Object.keys(response);
    const whichToShow = "2. high";
    setInterval(function(){
        printPrice(response[keys.shift()][whichToShow])
    }, 1000);
})
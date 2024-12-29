//function to fetch Advice data
const getAdviceData = async function (){
    const request = await fetch(`https://api.adviceslip.com/advice`);
    const data = await request.json();
    console.log(data.slip.advice)
    displayAdviceData(data);
};

getAdviceData();

//display the fetched Advice data
const displayAdviceData = function (data){
    const adviceInfo = document.querySelector("#adviceInfo")
    adviceInfo.innerText = `${data.slip.advice}`;
};
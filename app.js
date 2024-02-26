const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let input = document.querySelector("form input");
let msg = document.querySelector(".msg");



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && newOption.value === "USD"){
            newOption.selected = true;
        }
        else if(select.name === "to" && newOption.value === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let country = countryList[currCode];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let curr1 = document.querySelector(".from select").value;
    let curr2 = document.querySelector(".to select").value;
    let country1 = curr1.toLowerCase();
    let country2 = curr2.toLowerCase();
    console.log(country1, country2);
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country1}/${country2}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let ans = input.value * data[country2];
    msg.innerText = `${input.value}${curr1} = ${ans}${curr2}`;
});

// async function calculate(){
//     let curr1 = document.querySelector(".from select").value;
//     let curr2 = document.querySelector(".to select").value;
//     let country1 = curr1.toLowerCase();
//     let country2 = curr2.toLowerCase();
//     console.log(country1, country2);
//     let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country1}/${country2}.json`;
//     let response = await fetch(url);
//     let data = await response.json();
//     let ans = input.value * data[country2];
//     msg.innerText = `${input.value}${curr1} = ${ans}${curr2}`;
// };
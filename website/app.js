/* Global Variables */
const API_KEY = "8cfb04d7d80f88aa77e0b6c0534c1c29";
const generateBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
// create function to handle click
let handleClick=()=> {
    const zipcode = document.getElementById('zip').value;
    console.log(zipcode);
    console.log(feelings.value);
    (zipcode.length>4)?getDate(zipcode,dataFlow):null;     
}

// add event listener to the generate button
generateBtn.addEventListener('click',handleClick)

// async function fetching api to get weather data
async function getDate(zipcode,callback){
    const url = `https:\\api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}&units=metric`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    callback(data);
}

// crate async function dealing with the sever end point
async function dataFlow(data){ 
    await fetch('/sendData',{
        method:'post',
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            date:newDate,
            temp:data.main.temp,
            feelings:feelings.value
        }) 
    })
    const dataRes = await fetch("/getData")
    const result = await dataRes.json()
    console.log(result)
    showData(result)
}

// creata a function to show up data 
function showData(result){
    date.innerHTML = `Date is : ${result.date}`
    temp.innerHTML = `Temprature is : ${result.temp} C`
    content.innerHTML = (result.feelings!='')?`Your feelings is :${result.feelings}`:'';
}


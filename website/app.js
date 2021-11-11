/* Global Variables */
const end_point = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY = '&appid={API_KEY}&units=metric';


//Get the date
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getData);

/* Function called by event listener */
function getData(e) {
  const zip_code = document.getElementById('zip').value;
  const message = document.getElementById('feelings').value;

  getWeather(end_point, zip_code, API_KEY)
    .then(function (Data) {
      addData('/addData', { date: newDate, temp: Data.main.temp, message })
    }).then(function (newData) {
      updatePage();
    })

}

/* Function to GET Web API Data*/
const getWeather = async (end_point, zip_code, API_KEY) => {
  const result = await fetch(end_point + zip_code + API_KEY);
  try {
    const userData = await result.json();
    return userData;
  } catch (err) {
    console.log(err.toString);
  }
}

/* Function to POST data */
const addData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: getinCF(data.temp),
      message: data.message
    })
  })

  try {
    const newData = await request.json();
    return newData;
  }
  catch (err) {
    console.log(err.toString);
  }
};


const updatePage = async () => {
  const request = await fetch('/getData');
  try {
    const data = await request.json()
    document.getElementById('date').innerHTML = `Today's Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
    document.getElementById('content').innerHTML = `Feeling: ${data.message}`;
  }
  catch (err) {
    console.log(err.toString);
  }
};

function changeDegree(){
    var checkbox = document.getElementById('checkbox1');
    var label = document.getElementById('checkLabel');
        if (checkbox.checked == false){
            label.innerHTML = "Celsius";
            }
            else{
                label.innerHTML = "Fahrenheit";
      }
}
function getinCF(degrees){
    var label = document.getElementById('checkLabel');
    if (label.innerText ===  'Celsius'){
        degrees = parseInt(degrees)
        return `${degrees}° C`
    }else {
        degrees = parseInt(degrees * 9/5 + 32);
        return `${degrees}° F`
    }
}

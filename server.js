// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8090;
const server = app.listen(port, listening);


// Post Route


app.post('/addData', (req, res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.message = req.body.message;
    res.send(projectData);
});



// Callback function to complete GET '/all'
app.get('/getData', (req, res)=> {
    res.send(projectData);
    console.log(projectData)
  });

// Setup Server
function listening() {
  console.log("Server Running 🏃‍♂️");
  console.log(`localhost: ${port}`);
};
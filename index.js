const express = require('express');
require('dotenv').config()

const addSchool = require('./routes/addSchool')
const listSchools = require('./routes/listSchools')

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// for health check purposes
app.get("/", (req, res) => {
    res.send(`School Management API server is up and running`);
})

// (POST) add school api
app.use('/addSchool', addSchool);

// (GET) list schools api
app.use('/listSchools', listSchools);

// route not found 
app.use((req, res, next) => {
    res.status(404).json({
        message: "Couldn't found this route !!!"
    })
});

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    console.log(`School Management API server is running on PORT: ${PORT}`)
})
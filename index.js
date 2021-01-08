//vars & requirements
var express = require('express')
var bodyParser = require('body-parser')
var mongoDAO = require('./mongoDAO')
var mySQLDAO = require('./mySQLDAO')

var app = express()

//view stuff
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))


//Home
app.get('/', (req, res) => {

    res.send('<p><a href="/listCountries">List Countires</a></p>\n <p><a href="/listCities">List Cities</a></p>\n <p><a href="/headOfStates">List Head of States</a></p>\n');

    console.log("in /")

})

//get the head of states
app.get('/headOfStates', (req, res) => {

    //mongo request
    mongoDAO.getHeadOfState()

        //displaying list
        .then((documents) => {

            res.render('listHeadOfStates', { headsOfState: documents })

        })

        .catch((error) => {


            res.send(error)
            console.log(error)
        })

    console.log("in /headOfStates")

})

//list the cities
app.get('/listCities', (req, res) => {

    //mysql request
    mySQLDAO.getCities()

        //displaying the list
        .then((result) => {

            res.render('listCities', { cities: result })
            console.log("succcessful mysql")
        })

        .catch((error) => {

            res.send(error)
            console.log("BAD in mysql")
        })

    console.log("in /Cities")

})

//list the countries
app.get('/listCountries', (req, res) => {

    //mysql request
    mySQLDAO.getCountries()

        //displaying the list
        .then((result) => {
            res.render('listCountries', { countries: result })

        })
        .catch((error) => {
            res.send(error)
            console.log("BAD in mysql")

        })

    console.log("in /Countries")

})

//updating a country
app.get('/updateCountry', (req, res) => {
    res.render("updateCountry")

    console.log("in /updateCountry")

})

//adding head of states
app.get('/addHeadOfState', (req, res) => {
    res.render("addHeadOfState")

    console.log("in /addHeadOfState")

})

//adding a head of state to the database
app.post('/addHeadOfState', (req, res) => {

    mongoDAO.addHeadOfState(req.body._id, req.body.headOfState)

        .then((result) => {

            res.redirect("HeadOfStates")

        })

        .catch((error) => {

            if (error.message.includes("11000")) {

                res.send("<h3>Error: Head of State: " + req.body.headOfState + " already exist in the list</h3>")
            }
            else {
                res.send(error.message)
            }
        })
    console.log("in post /addHeadOfState")

})


//adding countries
app.get('/addCountry', (req, res) => {
    res.render("addCountry")

    console.log("in /addCountry")

})


//adding a country in the database
app.post('/addCountry', (req, res) => {

    mySQLDAO.addCountry(req.params.co_code, req.params.co_name, req.params.co_details)

        .then((result) => {

            if (result.affectedRows == 0) {
                res.send("<h3>Country: " + req.params.co_name + " already exist</h3>")

            }
            else {
                res.send("<h3>Country: " + req.params.co_name + " successfully added</h3>")
            }

        })

        .catch((error) => {

        })
    console.log("in post of update countries")

})


//port listener
app.listen(3000, () => {

    console.log("listening on port 3000")


})
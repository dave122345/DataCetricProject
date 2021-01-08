//vars
const { promiseImpl } = require('ejs');
var mysql = require('promise-mysql')

//mysql pool
var pool

mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'geography'
})

    //if success for pool
    .then((result) => {

        pool = result
        console.log("succcess for pool")


    })

    //if error in pool
    .catch((error) => {

        console.log(error)
        res.send("ERROR in pool")

    });

//getting data from mySQL
var getCities = function () {

    //return for pool
    return new Promise((resolve, reject) => {
        pool.query('select * from city')

            .then((result) => {

                resolve(result)
                console.log("ALL GOOD")

            })
            .catch((error) => {
                reject(error)
                console.log("BAD")

            })
    })
}

//displaying the cities
var findCity = function (city_code) {

    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select * from city where cty_code = ?',
            values: [city_code]


        }

        pool.query(myQuery)

            //if success
            .then((result) => {

                resolve(result)
                console.log("succcessful in city search")


            })

            //if error
            .catch((error) => {

                reject(error)
                console.log("error in city search")

            })

    })
}

//delete city
var deleteCity = function (city_code) {

    return new Promise((resolve, reject) => {

        var myQuery = {
            sql: "delete from college_table where cty_code = ?",
            values: [city_code]

        }
        pool.query(myQuery)

            //if success
            .then((result) => {

                resolve(result)
                console.log("succcessful in college deletion")


            })

            //if error
            .catch((error) => {

                reject(error)
                console.log("error in student deletion")

            })


    })
}

//seeing all the country
var getCountries = function () {

    //return for pool
    return new Promise((resolve, reject) => {
        pool.query('select * from country')

            .then((result) => {

                resolve(result)
                console.log("ALL GOOD")

            })
            .catch((error) => {
                reject(error)
                console.log("BAD")

            })
    })
}

//deleting a country
var deleteCountry = function (co_code) {

    return new Promise((resolve, reject) => {

        var myQuery = {
            sql: "delete from country where co_code = ?",
            values: [co_code]

        }
        pool.query(myQuery)

            //if success
            .then((result) => {

                resolve(result)
                console.log("succcessful in country deletion")


            })

            //if error
            .catch((error) => {

                reject(error)
                console.log("error in country deletion")

            })


    })
}


//adding a country
var addCountry = function (co_code, co_name, co_details) {

    return new Promise((resolve, reject) => {

        var myQuery = {
            sql: "insert into country (co_code, co_name, co_details) values (?, ?, ?)",
            values: [co_code, co_name, co_details]

        }
        pool.query(myQuery)

            //if success
            .then((result) => {

                resolve(result)
                console.log("succcessful in country adding")


            })

            //if error
            .catch((error) => {

                reject(error)
                console.log("error in country adding")

            })


    })
}
//export
module.exports = { addCountry, deleteCountry, getCities, getCountries, findCity, deleteCity }

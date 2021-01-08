//const
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'headsOfStateDB'
const colName = 'heads'

//vars
var headOfStateDB
var heads

//connecting
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        headsOfStateDB = client.db(dbName)
        heads = headsOfStateDB.collection(colName)
        console.log("success on mongo")
    })

    .catch((error) => {
        console.log(error)

    })



//finding the Head Of State
var getHeadOfState = function () {

    return new Promise((resolve, reject) => {

        var cursor = heads.find()

        cursor.toArray()

            .then((documents) => {
                resolve(documents)
                console.log("ALL GOOD IN MONGO")

            })

            .catch((error) => {
                reject(error)
                console.log("ALL BAD IN MONGO")


            })
    })

}

//adding a Head Of State to the collection
var addHeadOfState = function (_id, headOfState) {

    return new Promise((resolve, reject) => {
        heads.insertOne({ "_id": _id, "headOfState": headOfState })
            .then((result) => {

                resolve(result)

            })

            .catch((error) => {

                reject(error)
            })


    })
}



//export
module.exports = { getHeadOfState, addHeadOfState }
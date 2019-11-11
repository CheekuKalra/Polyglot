// CRU - Create update, read and delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true}, (error, client) => {

    if (error) {
        return console.log('Unable to connect to the database')

    }

   const db = client.db(databaseName)

// db.collection('users').updateOne({
    
//     _id: new ObjectID('5db57edee582752fa42011e0')
// }, {
//     $set: {
//         name: 'Mike'
//     }
// }).then((result) => {

//     console.log(result)
// }).catch ((error) => {

//     console.log(error)
// })

// db.collection('tasks').updateMany({
//     _id: new ObjectID('5db5ee4a801d020a948ab356')
// }, {
//     $set: {
//         completed: true
//     }
// }).then((result) => {
//     console.log(result.modifiedCount)
// }).catch((error) => {
//     console.log(error)
// })

// db.collection('users').deleteMany({
//     age: 27
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

db.collection('tasks').deleteOne({
    task: 'running'
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

    })

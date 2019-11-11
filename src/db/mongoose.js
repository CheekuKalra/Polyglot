const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false

})

mongoose.set('useFindAndModify', false);
// const Task = mongoose.model('Task', {

//     description: {
//         type: 'String',
//         required: true,
//         trim: true 
//     }, completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const me = new Task({
//     description: 'running'
    

// })

// me.save().then((me) => {
// console.log(me)
// }).catch((error) => {
//     console.log('Error')
// })
const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

const port = process.env.PORT || 3000

// app.use((req, res, next) => {

//   if (req.method === 'GET') {
     
//    res.send('GET requests are disabled')
//   } else{

//    next()
//   }
// })

// app.use((req, res, next) => {

   
//     res.sendStatus(503).send('Server is under maintaincance')  
   

   
// })


app.use(express.json())

app.use(userRouter)

app.use(taskRouter)




app.listen(port, () => {

console.log('Server is up on port' + port)
})


const jwt = require('jsonwebtoken')


const myFunction =  async() => {

   const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn:'7 days'})
   console.log(token)

   const data = jwt.verify(token, 'thisismynewcourse')
   console.log(data)
    
}

myFunction()
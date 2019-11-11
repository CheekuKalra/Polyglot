const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', async (req, res)  => {
    const task = new Task(req.body)
    
    try{
      await task.save()
            res.send(task)
    } catch (e) {
    
        res.status(400).send(e)
    }
    })
    
    
    router.get('/tasks', (req, res) => {
    
        Task.find({}).then((tasks) => {
            res.send(tasks)
        }).catch((e) => {
            res.status(500).send()
        })
    })
    
    router.get('/tasks/:id', (req, res) => {
    
    const _id = req.params.id
    
    Task.findById(_id).then((tasks) => {
        if (!tasks) {
          return res.status(500).send()
        }
    
        res.send(tasks)
    }).catch((e) => {
    
        res.status(500).send()
    })
    
    })
    
    
    router.patch('/tasks/:id', async(req, res) => {
    
    const updateT = Object.keys(req.body)
    
    const allowedTasks = ["description", "completed"]
    
    const isValidT = updateT.every((update) => allowedTasks.includes(update))
    
    if (!isValidT) {
        
       return res.sendStatus(400).send()
    }
    
    
    try{
    

        const updateTask = await Task.findById(req.params.id)

        updateT.forEach((update) => updateTask[update] = req.body[update])

        await updateTask.save()


            


    //const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true} )
    
    if (!updateTask) {
        res.sendStatus(400).send()
    }
    
    res.send(updateTask)
    
    } catch (e) {

        console.log(e)
    
        res.sendStatus(500).send()
    }
    
    
    })
    
    
    
    router.delete('/tasks/:id', async(req, res) => {
    
        try{
    
            const delTask = await Task.findByIdAndDelete(req.params.id)
    
            if (!delTask) {
                res.sendStatus(400).send()
            }
    
            res.send(delTask)
    
    
        }catch (e) {
    
    
            res.sendStatus(500).send
        }
    
    
    
    })
    


module.exports = router
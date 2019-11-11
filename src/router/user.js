const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User({

        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
  
    try{
        
    
       await user.save()


       const token = await user.generateAuthToken()
      

    res.sendStatus(201).send({user, token})
            //res.status(201).send(user)
    
    } catch (e) {
    
        console.log(e)

    
     res.status(400).send(e)
        
    }
        
    })

router.post('/users/login', async(req, res) => {

    try{

        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.send({user, token})

    } catch (e) {

        console.log(e)
        res.sendStatus(400).send()

    }

})


router.post('/users/logout', auth, async (req, res) => {

    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()


        res.send()
    } catch (e) {

        res.sendStatus(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {

try{

    req.user.tokens = []
    await req.user.save()

    res.sendStatus(200)

} catch (e) {

    res.sendStatus(500)

}

})




router.get('/users/me', auth, async (req, res) => {

    
    res.send(req.user)
})

    router.get('/users/:id', async (req, res) => {

        const _id = req.params.id
    
        try{
            const user = await User.findById(_id)
    
            if (!user) {
             res.sendStatus(500).send()   
            }
            res.send(user)
    
        } catch(e) {
    
            res.sendStatus(500).send()
        }
    
        // User.findById(_id).then((user) => {
    
        //     if (!user) {
        //         res.send(500).send()
        //     }
        //     res.send(user)
        // }).catch((e) => {
            
        // })
    
    
    })

    router.patch('/users/:id', async(req, res) => {

        const updates = Object.keys(req.body)
        const allowedUpdates = ["name", "age", "email" , "password"]
        const isValid = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValid) {
          return  res.sendStatus(402).send()
            
        }
            
    
        try{
    
            const user = await User.findById(req.params.id)
            

            updates.forEach((update) => user[update] = req.body[update])

            await user.save()

        
            //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
    
            if (!user) {
               return res.sendStatus(402).send()
            }
    
            res.send(user)
        } catch (e) {
    
            console.log(e)
            res.sendStatus(500).send()
    
        }
        
    
    })

    router.delete('/users/:id', async(req, res) => {

        try{
        
            const delUser = await User.findByIdAndDelete(req.params.id)
        
            if (!delUser) {
                
                res.sendStatus(400).send()
            }
        
            res.send(delUser)
        } catch (e) {
        
            res.sendStatus(500).send()
                
         }
        })

       

module.exports = router
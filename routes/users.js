var express = require('express')
var router = express.Router()
const User = require('../models/users')

const {checkBody} = require('../modules/checkBody')

router.get('/', (req, res) => {
	User.find({}).then(data => {
		res.json({ weather: data });
	});
});
router.post('/signup', (req,res) => {
    if(!checkBody(req.body,['name','email', 'password'])) {
        res.json({result:false,error: 'Missing or empty fields' })
        return;
    } 

    User.findOne({ email:{$regex: new RegExp(req.body.email)}}).then(data => {
        if(data === null) {
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                })
                newUser.save().then(
                    res.json({result: true})
                )
            } else {
                res.json({result: false, error: 'User already exists' })
            }
        })
        
    
    
})

router.post('/signin', (req,res) =>  {
    if(!checkBody(req.body,['email', 'password'])) {
        res.json({result: false, error:"Missing or empty fields"})
        return;
    } 
        User.findOne({email:{$regex : new RegExp(req.body.email)}, password:req.body.password}).then(data => {
            console.log(data)
            if(data) {
                res.json({result: true})
            } else {
                
                res.json({result: false, error:'User not found'})
            }
        })
    
})




module.exports = router
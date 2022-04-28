const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.model')
const Group = require('../models/group.model')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.use(verifyAuthToken)

/** POST localhost:3000/users/create
 * {
 *  "username": "apple",
 *  "firstName": "pencil",
 *  "lastName" : "ass",
 *  "password" : "shit"
 * }
 */

// router.route('/create').post((req, res)=>{
//     const username = req.body.username
//     const password = req.body.password
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName

//     const newUser = new User({firstName, lastName, username, password})

//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

/**
 * PUT localhost:3000/users/add
 * {
 *    "username": "apple",
 *    "group": "groupID of the group"
 * }
 * 
 */
router.route('/add').put((req, res)=>{
    User.findOneAndUpdate({username:req.body.username}, {$push: {"group": req.body.group}}, (err, user) => {
        if(err){
            res.send(err)
        } else{
            res.json("success")
        }
    },
    Group.findByIdAndUpdate(req.body.group, {$push:{'users': req.body.username}}, (err, result) =>{
        if(err) {
          res.send(err)
        } else {
          res.send("success")
        }
    })
)})

/**
 * PUT localhost:3000/users/leave
 * {
 *    "username": "apple",
 *    "group": "groupID of the group"
 * }
 */
router.route('/leave').put((req, res)=>{
    User.findOneAndUpdate({username:req.body.username}, {$pull: {"group": req.body.group}}, (err, user) => {
        if(err){
            res.send(err)
        } else {
            res.send("success")
        }
    },
    Group.findByIdAndUpdate(req.body.group, {$pull:{'users': req.body.username}}, (err, result) =>{
        if(err) {
          res.send(err)
        } else {
          res.json("success")
        }
    })
)})

/**
 * GET localhost:3000/users/get
 * {
 *    "username": "apple"
 * }
 * or don't pass anything in the body to get all Users
 */
router.route("/get").get((req, res)=>{
    var query = {}
    if("username" in req.body){
        query["username"] = req.body.username
    }
    User.find(query)
    .then(user=>res.json(user))
    .catch(err => res.status(400).send(null))
})


function verifyAuthToken(req, res, next) {
    const tokenString = req.headers['authorization']
    if (tokenString) {
        const token = tokenString.split(' ')[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("FAKE")
              return res.sendStatus(403)
            } 
            req.user = user
            next() 
          })
    } else {
        return res.sendStatus(403)
    }
}
module.exports = router
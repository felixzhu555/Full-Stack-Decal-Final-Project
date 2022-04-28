const router = require('express').Router();
const { query } = require('express');
let Group = require('../models/group.model');

/**
 * POST localhost:3000/groups/create
 * {
 *  "title", 
 *  "date",
 *  "location"
 *  blah blah blah 
 * }
 * 
 */
router.route('/create').post((req, res) => {
  const title = req.body.title;
  const date = new Date(req.body.date);
  const location = req.body.location
  const time = req.body.time;
  const virtualLink = req.body.virtualLink;
  const description = req.body.description;
  const users = req.body.users;
  const className = req.body.className;

  const newGroup = new Group({
    title,
    date,
    location,
    time,
    virtualLink,
    className,
    description,
    users,
  });

  newGroup.save()
  .then(result => res.json({_id:newGroup._id}))
  .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * GET localhost:3000/groups/get/
 * {
 *  "_id": "groupid", //all are optional
 *  "date":"2022-02-11",
 *  "className": "CS61A"  
 * }
 *  pass in nothing to get every group
 * 
 */
router.route("/get")
.post((req, res)=>{
  // var queryId = false
  // const query = req.body
  // if("id" in req.body){
  //   console.log("Here")
  //   query["_id"] = req.body.id
  //   queryId = true
  // } 
  // if("date" in req.body){
  //   query["date"] = req.body.date
  // }
  // if("className" in req.body){
  //   query["className"] = req.body.className
  // }
  // console.log(query)
  Group.find(req.body, (err, Group) =>{
    if(err){
      console.log(err)
      res.sendStatus(400)
    }
    else {
      res.json(Group)
    }
  })
})

//only need id for delete
router.route('/delete').delete((req, res) => {
  Group.findByIdAndDelete(req.body._id)
    .then(() => res.json('Group deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//needs group id and username to add
// PUT localhost:3000/groups/add
// {
  //   "_id" : "isafjeiorjfeoirfje", //this is the group id
  //   "users": "username1"
// }
router.route('/add').put((req, res) => {
    Group.findByIdAndUpdate(req.body._id, {$push:{'users': req.body.users}}, (err, result) =>{
      if(err) {
        res.send(err)
      } else {
        res.json(result)
      }
    })
})

//needs group id and username to remove
//PUT localhost:3000/groups/leave
// {
//   "_id" : "isafjeiorjfeoirfje", //this is the group id
//   "users": "username1"
// }
router.route('/leave').put((req, res) => {
  Group.findByIdAndUpdate(req.body._id, {$pull: {"users":req.body.users}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router;
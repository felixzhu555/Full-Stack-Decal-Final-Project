const express = require('express');
//const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user.model');
const Group = require('../models/group.model');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  '/register',
//   [
//     check('username', 'Please Enter a Valid Username').not().isEmpty(),
//     check('password', 'Please enter a valid password').isLength({min: 6}),
//   ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array(),
    //   });
    // }

    const { firstName, lastName, username, password  } = req.body;
    try {
        let userAlreadyExists = await User.findOne({
            username,
        });
        if (userAlreadyExists) {
            return res.status(400).send("username taken");
        }

        let user = new User({
            firstName,
            lastName,
            username,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'randomString',
            { expiresIn: 10000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ 
                    msg: "Registration successful!", 
                    token: token
                });
            }
        );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Error in registration');
    }
  }
);

router.post(
  '/login',
//   [
//     check('username', 'Please enter a valid username').not().isEmpty(),
//     check('password', 'Please enter a valid password').isLength({
//       min: 6,
//     }),
//   ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array(),
    //   });
    // }

    const { username, password } = req.body;
    try {
        let user = await User.findOne({
            username,
        });
        if (!user)
            return res.status(400).send("Username not found.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).send("Incorrect password.");

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(
            payload,
            'randomString',
            { expiresIn: "2 days" },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    msg: "Login successful!",
                    token: token
                });
            }
        );
    } catch (e) {
      console.error(e);
      res.status(500).send("Error in login");
    }
  }
);

const auth = require("./../middleware/auth");

router.get('/me', auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send("error in fetching user");
    }
});
 
router.put('/add', auth, async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        user.group.push(req.body.group);
        await user.save();
        const group = await Group.findById(req.body.group);
        group.users.push(req.body.username);
        await group.save();
        res.send("success adding user to group");
        // User.findOneAndUpdate({username:req.body.username}, {$push: {"group":req.body.group}})
        // Group.findByIdAndUpdate(req.body.group, {$push:{'users': req.body.username}})
    } catch (e) {
        res.send("error adding user to group");
    }
});

router.put('/leave', auth, async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        user.group = user.group.filter(id => id !== req.body.group);
        await user.save();
        const group = await Group.findById(req.body.group);
        group.users = group.users.filter(usr => usr !== req.body.username);
        await group.save();
        res.send("success removing user from group");
    } catch (e) {
        res.send("error removing user from group");
    }
});

module.exports = router;
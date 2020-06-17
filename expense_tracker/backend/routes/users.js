const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
let User = require('../models/user.model');
let List = require('../models/expense_list.model');
const validateRegisterInput = require("../validate_input/register");
const validateLoginInput = require("../validate_input/login");


//all users
router.route('/').get((req,res)=>
{
    User.find()
    .then(users => res.json(users))
    .catch(err=>res.status(400).json('Error '+err));
});

//register
router.route('/register').post((req,res)=>
{
  const { errors, isValid } = validateRegisterInput(req.body);// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
      User.findOne({ username: req.body.username }).then(user => {
        if (user) {
          return res.status(400).json({ username: "Username already exists" });
        } 
        else {
          
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            monthly_budget: req.body.monthly_budget
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json('User added'))
                .catch(err => console.log('Error '+err));
            });
          });
        }
      });
});
//login
router.route('/login').post((req,res)=>
{
  console.log("login user: " + req.body.username);
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then(user => {
        if (!user) {
          return res.status(404).json({ usernamenotfound: "Email not found" });
        }// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
            id: user.id,
            username: user.username,
            monthly_budget:user.monthly_budget
            };// Sign token
            jwt.sign(
            payload,
            keys.secretOrKey,
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
            );
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
});

router.route('/:id').get((req,res)=>{
    User.findById(req.param.id)
    .then(list => res.json(list))
    .catch(err=>res.status(400).json('Error : '+err));
});
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(list=>res.json('User deleted !'))
    .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/updateBudget/:id').post((req,res)=>
{
    List.findById(req.params.id)
    .then(list=>{
    
    list.monthly_budget=req.body.monthly_budget;
  
    list.save()
    .then(()=>res.json('budget updated!'))
    .catch(err=>res.status(400).json('Error : '+err));
    })
    .catch(err=>res.status(400).json('Error : '+err));       
});

module.exports = router;

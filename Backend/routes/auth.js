const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();
router.use(express.json());
// Define User model
const User = require('../models/User');
const userctl=require('../controller/userctrl')
const jwt=require('jsonwebtoken')
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
// varifying jwt token
// const jwtAuth=(req,res,next)=>{
//   // const token =req.headers.authorization;
//   // token=token.split(' ')[1];
//   if(req.headers.authorization) { var token = req.headers.authorization.split(' ')[1]; }
//   jwt.verify(token,process.env.SECRETKEY,function(err,decoded){
//     if(err){
//       res.send({message:'Invalid Token'})
//     }else{
//       next();
//     }
//   })
// }


// const { User: users = [], refetch } = useQuery(["users"], async () => {
//   const res = await fetch(url, {
//       headers: { 
//         authorization: `bearer ${token}`
//   }});
//   return await res.json();
// });


var jwtAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No authorization token found' });
  }
};

// const jwtAuth = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'No authorization token found' });
//   }

//   const tokenValue = token.split(' ')[1];

//   jwt.verify(tokenValue, process.env.SECRETKEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
    
//     // Token is valid, proceed to the next middleware
//     next();
//   });
// };

router.get('/findusers', jwtAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});



// router.use(express.json())
// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    // console.log(req.body)
    // Here we are getting the token and storing into the data base
step:2    
     const myToken=await user.getAuthToken();
     console.log(res.myToken)
    
    res.status(200).json({ message: 'User created successfully', token:myToken } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});
// Make sure you have the latest version of Mongoose installed (npm install mongoose@latest) to avoid compatibility issues.

router.post('/login',async (req,res)=>{
  if(!req.body.username || !req.body.password){
    res.status(301).json({message:'error', message:'Please enter your Username and password'})
  }
  
  const userfind=await User.findOne({username:req.body.username})
  // console.log(userfind);
  var responseType={
    message:'ok'
  }
  if(userfind){
       var match= await bcrypt.compare(req.body.password,userfind.password)
       const usrrtoken=await userfind.getAuthToken();
       if(match){
        responseType.message="Login Successfully";
      //   // responseType.token='ok';
        responseType.token=usrrtoken;
       responseType.statusText='Success'
     
       }else{
        responseType.message='Invalid Password';
       
       }
  }else{
    responseType.message='Invalid Username';
    
  }
  res.status(200).json({message:'ok',data:responseType})
})

// router.post('/add',async(req,res)=>{
 
//   console.log(req.body)
//     res.status(200).json({message:'ok'})
// })





// Login route
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.status(200).json({ message: 'Login successful' });
// });

module.exports = router;

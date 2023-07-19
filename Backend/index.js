const express = require('express');
const app = express();
const axios=require('axios')
const cors=require('cors')
// passport 
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// implement database
const connectdb=require('./configuration/db');

const authRoutes = require('./routes/auth');
const User = require('./models/User');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use(
  session({
    secret: 'Gorail',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport local strategy
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//       });
//     });
//   })
// );
// Configure Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  })
);

// Configure Passport session serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// const ensureAuthenticated = (req, res, next) => {
//   passport.checkAuthentication = function(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     return  res.json({ isAuthenticated: true });
// }
// passport.setAuthenticatedUser=function(req,res,next){
//     console.log(req);
//     if(req.isAuthenticated()){
//         res.locals.user=req.user;
//     }
//   next();
// }
// };


app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    // User is not authenticated
    res.json({ isAuthenticated: false });
  }
});









// API endpoint for fetching train fare
app.get('/getFare', async (req, res) => {
    const {fromStationCode, toStationCode, trainNo } = req.query;
  
    // Make a request to the external API to fetch the train fare
    const options = {
      method: 'GET',
      url: 'https://irctc1.p.rapidapi.com/api/v1/searchStation',
      params: {  trainNo,
      fromStationCode,
      toStationCode},
      headers: {
        'X-RapidAPI-Key': '9c248aaca0mshc85e458d73181aep142993jsn7fb3773c1575',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    // try {
    //     const response = await axios.request(options);
    //     const fareData = response.data; // Process the response data as per your requirement
    //     console.log(fareData);
    //     // Send the response back to the frontend
    //     res.json(fareData);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Something went wrong' });
    //   }
    });


    // PNR routes
   
app.get('/getpnr', async(req,res)=>{
  const { pnrNumber}=req.query
  const options = {
    method: 'GET',
    url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
    params: {
      pnrNumber
    },
    headers: {
      'X-RapidAPI-Key': '9c248aaca0mshc85e458d73181aep142993jsn7fb3773c1575',
      'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})

app.get('/train-live', async(req,res)=>{

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
  params: {
    trainNo: '19038',
    startDay: '1'
  },
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

})
app.get('/tr',async(req,res)=>({}))




app.use('/',authRoutes)
// Start the server
const port = process.env.local.PORT || 3001;
app.listen(port, async() => {
 await connectdb();
  console.log(`Server started on port ${port}`);
});

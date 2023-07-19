const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
// import { env } from 'node:process';
// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tokens:[
    {
      token:{
        type:String,
        require:true
      }
    }
  ]
},{timestamps: true});


// userSchema.pre('save',function(next){
//   var salt=bcrypt.genSaltSync(10)
//   if(this.password && this.isModified('password')){
//     this.password=bcrypt.hashSync(this.password,salt)
//   }
// })


// Here we are creating the sessin token and storing them

step:1
userSchema.methods.getAuthToken= async function(user){
  let params={
    id:this._id,
    username:this.username,
    password:this.password
  }
  var tokenValue = jwt.sign(params, process.env.SECRETKEY, {expiresIn:'300000s'});
 this.tokens=this.tokens.concat({token:tokenValue})
   await this.save();
   return tokenValue;
}
// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;

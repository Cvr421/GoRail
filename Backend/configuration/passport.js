const JWTStrategy=require('passport-jwt').Strategy;
const Extract =require('passport-jwt').ExtractJwt;

const { ExtractJwt } = require('passport-jwt');

const Users = require('../models/User');

module.exports=function(passport){
    let params={
        secretOrKey:"secret",
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()

    };
    passport.use(
        new JWTStrategy(params,function(jwt_payload,next) {
            let username=jwt_payload.username
            Users.findOne({username:username},function(err,user){
                if(err){
                    return next(err,false)
                }
                if(user){
                    next(null,user)

                }else{
                     next(null,false)
                }
            });
            
        })
    )
}
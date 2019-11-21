const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const session = require('express-session');
let jwt = require('jsonwebtoken');
const config = require('../../config/database.config.js');


exports.signup = (req,res) => {
    if(!req.body.name||!req.body.email||!req.body.password) {
        return res.status(400).send({
            message:"Please enter all the credentials"
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: createHash(req.body.password),
        token: ''
    });

    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            {
                message:  err
            }
        );
    })

}

exports.login = (req,res) => {
    User.findOne({email:req.body.email}).then(student => {
        if(student==null) {
            res.status(400).send({
                message:"Email not valid"
            });
            return;
        } else {
            bcrypt.compare(req.body.password, student.password, function(err, passwordMatched) {
                if(passwordMatched==true) {
                    let token = jwt.sign({email:student.email}, config.JWT_SECRET,{expiresIn: '2d'});
                    
                    req.session.userId=student.id;

                    res.send({
                    message:"Success",
                    token: token
                });
            } else {
                res.status(400).send({
                    message:"Password doesnot match"
                });
            }
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Server Error"||err
        })
    });
    // session.email = req.body.email
}

// Generates hash using bCrypt
var createHash = function(password){
    
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
   }
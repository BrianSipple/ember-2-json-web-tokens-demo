var
    express = require('express'),
    config = require('../config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),

    app = module.exports = express.Router(),

    currentUserId = 1

// Ideally, this should be a database of our users :-)
    users = [
        {
            id: currentUserId,
            username: 'bsipple',
            password: 'conflagration'
        }
    ];


function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secret, {
        expiresInMinutes: 60 * 5
    });
}


function validateRequestProps(req, res) {    
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('You must send both the username and password');
    }
}

function findUserByName (name) {
    var userFound;
    users.forEach(function (user) {
        if (user.username === name) {
            userFound = user;
        }
    });
    return userFound;
}

app.post('/users', function (req, res) {
    
    validateRequestProps(req, res);
    
    if (findUserByName(req.body.username)) {
        return res.status(400).send('A user with that name already exists.');
    }
    
    var newProfile = {
        username: req.body.username,
        password: req.body.password,
        extra: req.body.extra 
    };
    
    //profile.id = AuthService.generateId();   // Ideal
    newProfile.id = ++currentUserId;
    
    users.push(newProfile);
    
    res.status(201).send({
        id_token: createToken(profile)
    });
});

app.post('/sessions/create', function (req, res) {
   
    validateRequestProps(req);
    
    var user = findUserByName(req.body.username);
    
    if (!user) {
        return req.status(401).send('The username or password don\'t match!');
    }
    
    if (user.password !== req.body.password) {
        return req.status(401).send('The password does not match for the current username');
    }
    
    res.status(201).send({
        id_token: createToken(user)
    });
    
});
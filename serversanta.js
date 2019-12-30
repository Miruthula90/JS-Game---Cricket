const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const bcrypt = require("bcryptjs");

const saltRounds = 10;
app.use(cors());
app.use(bodyParser.json());

app.post('/userdata', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;

        var db = client.db('SecretSanta');

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                console.log(hash);
                db.collection('users').insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    phonenumber: req.body.phonenumber,
                    role: "PLAYER",
                    child: "",
                    parent: "",
                    assignedTask: [{
                        taskName: "",
                        taskMessage: "",
                        startTime: "",
                        endTime: "",
                        status: ""
                    }],
                    taskAssigned: [{
                        taskName: "",
                        taskMessage: "",
                        startTime: "",
                        endTime: "",
                        status: ""
                    }]
                }, function(err) {
                    if (err) throw err;

                    res.status(200).json({
                        "message": "succes"
                    })
                    client.close();
                })
            })
        })
    })
})

app.post('/login', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");
        var result = db.collection("users").findOne({ email: req.body.email })

        result.then(function(userdata) {
            if (userdata !== null) {
                console.log(userdata);
                bcrypt.compare(req.body.password, userdata.password, function(err, hasResult) {
                    if (hasResult == true) {
console.log("success");
console.log(req.body.email);
                        res.json({
                            "message": "success","email":req.body.email,"username":userdata.username
                        })
                       
                    } else {
                        console.log("wrong")
                        res.status(403).json({
                            message: "wrong password"
                        })
                    }
                })
                client.close()
            }
        })
    })
})


app.get('/getdata', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");
        var result = db.collection("users").find({"role":{$ne:"ADMIN"}}).toArray();

        
        result.then(function(userdata) {
            if (userdata !== null) {
                console.log(userdata);
                //console.log(result);
                console.log("success");
                res.json(
                    userdata
                )
                
            }
            else
            {
                console.log("wrong")
                res.status(403).json({
                    message: "no data"})
            }
            client.close()
        }
        )
        
    })
})

app.post('/getplayerdata', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");
        var result = db.collection("users").findOne({ email: req.body.email })

        
        result.then(function(userdata) {
            if (userdata !== null) {
                console.log(userdata);
                //console.log(result);
                console.log("success");
                res.json(
                    userdata
                )
                
            }
            else
            {
                console.log("wrong")
                res.status(403).json({
                    message: "no data"})
            }
            client.close()
        }
        )
        
    })
})

app.post('/updatedata', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");
        console.log("check1");
        //var idval=req.body.id.replace("'","");
        //console.log(idval);
        console.log(req.body.child);
        console.log(req.body.parent);
        
        //console.log(db.collection("users").updateOne({"_id": idval},{$set:{"child":req.body.child,"parent":req.body.parent}}));
        var result = db.collection("users").updateOne({"_id": new mongodb.ObjectID(req.body.id)},{$set:{"child":req.body.child,"parent":req.body.parent}});
       // db.users.updateOne({"_id":req.body._id},{$set:{"child":req.body.child,"parent":req.body.parent}})
        
        result.then(function(userdata) {
            if (userdata !== null) {
                console.log(userdata.matchedCount);
                //console.log(result);
                console.log("successful update"); 
                res.json(
                    {"message":"modified"}
                )
                
            }
            else
            {
                console.log("wrong update")
                res.status(403).json({
                    message: "no data"})
            }
            client.close()
        }
        )
        
    })
})


app.post('/updatechildtask', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");       
        console.log(req.body);
        console.log(req.body.parent);
        var arr=[{"taskName":req.body.taskName,"taskMessage":req.body.taskMessage,"taskstarttime":
        req.body.taskstarttime,"taskendtime":req.body.taskendtime,"status":req.body.status}];
        //arr=req.body;
        //arr.shift("email");
        
        //console.log(db.collection("users").updateOne({"_id": idval},{$set:{"child":req.body.child,"parent":req.body.parent}}));
        var result = db.collection("users").updateOne({"email":req.body.childemail},{$set:{"assignedTask":arr}});
       // db.users.updateOne({"_id":req.body._id},{$set:{"child":req.body.child,"parent":req.body.parent}})
        
        result.then(function(userdata) {
            if (userdata !== null) {
                console.log(userdata.matchedCount);
                //console.log(result);
                console.log("successful updated task to child"); 
                res.json(
                    {"message":"success"}
                )
                
            }
            else
            {
                console.log("wrong update")
                res.status(403).json({
                    message: "no data"})
            }
            client.close()
        }
        )
        
    })
})

app.post('/winner', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("cricket");
        //console.log("check1");
        //var idval=req.body.id.replace("'","");
        //console.log(idval);
        console.log(req.body.winner);
       
      
        //console.log(db.collection("users").updateOne({"_id": idval},{$set:{"child":req.body.child,"parent":req.body.parent}}));
        var result = db.collection("matches").insertOne({"match1winner":req.body.winner});
       // db.users.updateOne({"_id":req.body._id},{$set:{"child":req.body.child,"parent":req.body.parent}})
        
        result.then(function(userdata) {
            if (userdata !== null) {
                //console.log(userdata.matchedCount);
                //console.log(result);
                console.log("successful insertion"); 
                res.json(
                    {"message":"success"}
                )
                
            }
            else
            {
                console.log("insert failed")
                res.status(403).json({
                    message: "failed"})
            }
            client.close()
        }
        )
        
    })
})


app.listen(3000);
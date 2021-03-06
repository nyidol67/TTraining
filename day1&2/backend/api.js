import express from 'express';
import cors from 'cors';
import Mongo from 'mongodb';
import bodyParser from 'body-parser';
const MongoClient = Mongo.MongoClient;
const port = 8900;
const app = express();
let mongourl = "mongodb://localhost:27017";
var db;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(mongourl, (err, client) => {
    if (err) throw err;
    db = client.db("dbms");
    app.listen(port, (err) => {
        if (err) console.log(err);
        console.log(`Server running on port ${port}`);
    });
});

const val = "Welcome to NYC";
app.get('/', (req, res) => {
    res.send(val);
});

app.get('/welcome', (req, res) => {
    db.collection("user").find({ name: req.query.name }).toArray(function (err, result) {
        if (err) console.log(err);
        res.send(result);
    });
});

app.post('/addUser', (req, res) => {
    var userData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "address": req.body.address
    }
    db.collection('user').insertOne(userData, (err, result) => {
        if (err) throw err;
        res.send("document inserted");
    });
});
app.get('/showUser', (req, res) => {
    db.collection('user').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//delete user based on names
app.delete('/deleteUser', (req, res) => {
    db.collection('user').deleteOne({ name:req.body.name}, (err, result) => {
        if (err) throw err;
        res.send("deleted");
    });
});
//update user based on names
app.put('/updateUser', (req, res) => {
    db.collection('user').updateOne({ name: req.body.name },
        {
            $set: {
                mobile: req.body.mobile,
                address: req.body.address
            }
        }, (err, result) => {
            if (err) throw err;
            res.send("updated");
        });
});

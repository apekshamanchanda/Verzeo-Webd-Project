var express = require('express');
var app = express();
//var mysql = require('mysql');
var port = process.env.PORT || 5432
var cors = require('cors');
const{ Pool} = require('pg');

const pool = new Pool({
    host: "ec2-54-235-192-146.compute-1.amazonaws.com",
    user: "wfsaleezdtesli",
    password: "c1f025acc10c0a89fe6eddd7760293e9160e76b8e375b927a5965790709d2631",
    database: "d9frlfrnjqs4p0",
    port: 5432,
})

app.use('/static', express.static('public'))
app.use(cors());
app.use(express.json());

// var con = mysql.createConnection({
//   host: "ec2-54-235-192-146.compute-1.amazonaws.com",
//   user: "wfsaleezdtesli",
//   password: "c1f025acc10c0a89fe6eddd7760293e9160e76b8e375b927a5965790709d2631",
//   database: "d9frlfrnjqs4p0"
// });

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.sendFile('/contact_1.html', {root: __dirname});
});

app.post('/SubmitMessage', function(req, res){
    var name = req.body.name;
    var City = req.body.city;
    var email = req.body.email;
    var PhoneNumber = req.body.phonenumber;
    var messsage = req.body.Message;
    res.send(name + ' submitted sucessfully!!');
    var sql = "CREATE TABLE customer (Name VARCHAR(255), City VARCHAR(255), Email VARCHAR(255), Phone_Number VARCHAR(255), Message VARCHAR(255))";
    pool.query(sql, (err, res) => {
        console.log(err, res)
    })

    var sql_1 = "INSERT INTO customer (Name, City, Email, Phone_Number, Message) VALUES ($1, $2, $3, $4, $5)";
    pool.query(sql_1,[name, City, email, PhoneNumber, messsage], (err, res) => {
        if(err){
            throw err;
        }
        res.status(201).send('User added');

    })
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    // con.query("CREATE DATABASE customerInfodb", function(err, result){
    //     if(err) throw err;
    //     console.log("Database Created");

    // });
    //var sql = "CREATE TABLE customer (Name VARCHAR(255), City VARCHAR(255), Email VARCHAR(255), Phone_Number VARCHAR(255), Message VARCHAR(255))";
    // con.query(sql, function(err, result){
    //     if(err) throw err;
    //    // console.log("Table created");
    // });
    // var sql = "INSERT INTO customer(Name, City, Email, Phone_Number, Message) VALUES (? , ?, ?, ?, ?)";
    // con.query(sql, [name, City, email, PhoneNumber, messsage], function(err, result){
    // if(err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);
    //});
    // var mysql_1 = "select *from customerInfo";
    // con.query(sql_1);
    // const db = dbService.getDbserviceInstance();
    // const r = db.insertData();
    // r
    // .then(data => response.json({data: data}))
    // .catch(err => console.log(err));
});


var server = app.listen(port, function(){
    console.log('Node server is running');
});


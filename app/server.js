var express = require('express');
var app = express();
var fs = require("fs");
port = process.argv[2] || 8000;


/*************Database connection***************/
var mysql = require('mysql');
var connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'exam_database',
    host: 'localhost'
});

/*************Routes************/
app.configure(function () {
    app.use(express.urlencoded())
    app.use(express.json())
    app.use(express.static(__dirname)); // route
});

/****************Select****************/
app.get('/main', function (request, responce) {
    connection.query("SELECT * FROM exam_data", function (err, data) {
        responce.send(data);
    });
});


/****************Delete******************/
app.get('/delete/:deleteName', function (request, responce) {
    var deleteQuery = "DELETE FROM exam_data WHERE title = '" + request.params.deleteName + "' ";
    connection.query(deleteQuery);
});
/*****************Create**********************/
app.post('/add', function (request, response) {
    //var addProduct = "INSERT INTO exam_data SET title = '" + request.body.title + "',price = '" + request.body.price + "',brand = '" + request.body.brand + "',resolution = '" + request.body.resolution + "'";

    var addProduct = "INSERT INTO `exam_database`.`exam_data` (`id`, `title`, `price`, `brand`, `resolution`) VALUES (NULL, '" + request.body.title + "', '" + request.body.price + "', '" + request.body.brand + "', '" + request.body.resolution + "')";

    connection.query(addProduct);
    console.log(addProduct);
});

app.get('/delete', function (request, responce) {
    connection.query("SELECT * FROM exam_data", function (err, data) {
        responce.send(200, JSON.stringify(data));
    });
});

app.get('/add-product', function (request, responce) {
    connection.query("SELECT * FROM exam_data", function (err, data) {
        responce.send(200, JSON.stringify(data));
    });
});


app.post("/changes",function(request,responce){
    console.log(request.body);
    var updateQuery = "UPDATE exam_data SET title = '"+ request.body.title +"',price = '"+ request.body.price +"',brand = '"+ request.body.brand +"',resolution = '"+ request.body.resolution +"' WHERE title = '"+ request.body.oldName +"'";
    connection.query(updateQuery, function (err, data) {
        responce.send(data);
    });
});

console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");

app.listen(port); //the port you want to use


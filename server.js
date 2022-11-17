//참조 사이트
/**
 * https://expressjs.com/en/guide/routing.html
 */

const { Console } = require('console');
const express = require('express');

const app = express();

//call back을 대부분 해주는 듯.
const server = app.listen(3000, ()=> {
    console.log("Start server : localhost:3000");
});

let mysql      = require('mysql');

 //회사에서 할때
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'testdb'
});


/**
//집에서 할때
let pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'test'
});
*/


//views 폴더 가져오게 해주는 내용
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'))

//view 엔진 , ejs 엔진 사용 : html 안에서 js 코드 사용하게끔, 마치 jsp와 비슷
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.get('/', function (req , res) {
    res.render('index.html');
});

app.get('/about', function (req , res) {
    res.render('about.html');
});


app.get('/db', function(req , res) {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        connection.query('SELECT * FROM test', function (error, results, fields) {
            res.send(JSON.stringify(results));
            console.log('results',results);

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

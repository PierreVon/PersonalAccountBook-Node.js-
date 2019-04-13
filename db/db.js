var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'xxxxx',
    database : 'PersonalAccountBook'
});

connection.connect();

module.exports = connection;
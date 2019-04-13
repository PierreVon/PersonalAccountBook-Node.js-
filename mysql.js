var mysql      = require('mysql');
var async      = require('async')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pierre0214',
    database : 'PersonalAccountBook'
});

connection.connect();

connection.query('select * from expenditureTags', function (error, results, fields) {
    if (error) throw error;
    for (tag in results)
        console.log('The solution is: ', results[tag]);
});

connection.query('select totalMoney from totalMoney', function (error, results, fields) {
    if (error) throw error;
    //for (tag in results)
        console.log('The solution is: ', results[0].totalMoney);
});

    async.parallel({
        totalMoney: (callback) => {
            connection.query('select totalMoney from totalMoney',(err, result) => {
                callback(err, result[0].totalMoney)
            })
        },
        expenditure_list: (callback) => {
            connection.query('select * from expenditureTags', (err, result) => {
                callback(err, result)
            })
        }
    }, (err, results) => {
        if(err) { return next(err) }
        console.log(results['totalMoney'])
        console.log(results)
        //res.render('io_forms', { title: 'Personal Account Book', totalMoney: result.totalMOney[0].totalMoney, expenditure_list: result.expenditure_list })
    })


connection.end()
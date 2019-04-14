var db = require('../db/db')
var async = require('async')

// exports.index = (req, res, next) => {
//     db.query('select * from expenditureTags', (err, results, fields) => {
//         if(err) { return next(err) }
//         db.query('select totalMoney from totalMoney', (err2, results2, fields2) => {
//             if(err2) { return next(err2) }
//             res.render('io_forms', { title: 'Personal Account Book', totalMoney: results2[0].totalMoney, expenditure_list: results })
//         })
//     })
// }

exports.index = (req, res, next) => {
    async.parallel({
        totalMoney: (callback) => {
            db.query('select totalMoney from totalMoney', (err, result) => {
                callback(err, result[0].totalMoney)
            })
        },
        expenditure_list: (callback) => {
            db.query('select * from expenditureTags', (err, result) => {
                callback(err, result)
            })
        },
        earning_list: (callback) => {
            db.query('select * from earningTags', (err, result) => {
                callback(err, result)
            })
        }
    },(err, results) => {
        if(err) { return next(err) }
        res.render('io_forms', { title: 'Personal Account Book', totalMoney: results['totalMoney'], expenditure_list: results['expenditure_list'] , earning_list: results['earning_list']})
})
}
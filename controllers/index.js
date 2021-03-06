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
            db.query('select * from Tags where kind = 1', (err, result) => {
                callback(err, result)
            })
        }
        // ,
        // earning_list: (callback) => {
        //     db.query('select * from earningTags', (err, result) => {
        //         callback(err, result)
        //     })
        // }
    },(err, results) => {
        if(err) { return next(err) }
        res.render('post_expenditure', { title: 'Personal Account Book', totalMoney: results['totalMoney'], expenditure_list: results['expenditure_list'] })
})
}

exports.earning = (req, res, next) => {
    async.parallel({
        totalMoney: (callback) => {
            db.query('select totalMoney from totalMoney', (err, result) => {
                callback(err, result[0].totalMoney)
            })
        },
        // expenditure_list: (callback) => {
        //     db.query('select * from expenditureTags', (err, result) => {
        //         callback(err, result)
        //     })
        // },
        earning_list: (callback) => {
            db.query('select * from Tags where kind = 0', (err, result) => {
                callback(err, result)
            })
        }
    },(err, results) => {
        if(err) { return next(err) }
        res.render('post_earning', { title: 'Personal Account Book', totalMoney: results['totalMoney'], earning_list: results['earning_list'] })
    })
}

exports.detail = (req, res, next) => {
    async.parallel({
        totalMoney: (callback) => {
            db.query('select totalMoney from totalMoney', (err, result) => {
                callback(err, result[0].totalMoney)
            })
        },
        bill_list: (callback) => {
            db.query('select * from bill', (err, result) => {
                callback(err, result)
            })
        }
    },(err, results) => {
        if(err) { return next(err) }
        res.render('detail', { title: 'Personal Account Book', totalMoney: results['totalMoney'], bill_list: results['bill_list'] })
    })
}
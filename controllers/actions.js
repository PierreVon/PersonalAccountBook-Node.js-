var db = require('../db/db')
var async = require('async')

exports.postExp = (req, res , next) =>{
    var a = {
        'expenditure' : req.body.expenditure,
        'expenditureTag': req.body.expenditureTag,
        'expPurpose': req.body.expPurpose,
        'data': new Date().toLocaleDateString(),
        'time': new Date().toLocaleTimeString()
    }
    sql = "insert into expenditure values (" + req.body.expenditure +",'"+ new Date().toLocaleDateString() + "','" + new Date().toLocaleTimeString() + "','" + req.body.expenditureTag + "','" + req.body.expPurpose + "')"

    async.waterfall([
        (callback) =>{
            db.query(sql, (err) =>{
                if(err) return err
            })
            callback(null)
        },
        (callback) =>{
            db.query('select totalMoney from totalMoney', (err, result) =>{
                if(err) return err
                callback(null, result[0].totalMoney)
            })
        },
        (result, callback) =>{
            newTotal = result - req.body.expenditure
            console.log(newTotal)
            sql = "update totalMoney set totalMoney=" + newTotal + ",modifiedDate='" + new Date().toLocaleDateString() + "' where totalMoney=" + result
            console.log(sql)
            db.query(sql, (err, result) =>{
                if(err) return err
            })
            callback(null)
        }
    ],(err, result) =>{
        if(err) return err
        res.redirect('/')
    })
}

exports.postEar = (req, res , next) =>{
    sql = "insert into earning values (" + req.body.earning +",'"+ new Date().toLocaleDateString() + "','" + new Date().toLocaleTimeString() + "','" + req.body.earningTag + "','" + req.body.earPurpose + "')"

    async.waterfall([
        (callback) =>{
            db.query(sql, (err) =>{
                if(err) return err
            })
            callback(null)
        },
        (callback) =>{
            db.query('select totalMoney from totalMoney', (err, result) =>{
                if(err) return err
                callback(null, result[0].totalMoney)
            })
        },
        (result, callback) =>{
            newTotal = result + parseFloat(req.body.earning)
            console.log(typeof(req.body.earning))
            sql = "update totalMoney set totalMoney=" + newTotal + ",modifiedDate='" + new Date().toLocaleDateString() + "' where totalMoney=" + result
            console.log(sql)
            db.query(sql, (err, result) =>{
                if(err) return err
            })
            callback(null)
        }
    ],(err, result) =>{
        if(err) return err
        res.redirect('/change/earning')
    })
}
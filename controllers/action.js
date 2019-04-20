var db = require('../db/db')
var async = require('async')

exports.postExp = (req, res , next) =>{
    var datetime = new Date()
    var date = datetime.toLocaleDateString()
    var time = datetime.toLocaleTimeString()

    async.waterfall([
        (callback) =>{
            sql = "insert into bill values (" + req.body.expenditure +",'"+ date + "','" + time + "','" + req.body.expenditureTag + "','" + req.body.expPurpose + "'," + 1 + ")"
            console.log(sql)
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
            sql = "update totalMoney set totalMoney=" + newTotal + ",modifiedDate='" + date + "' where totalMoney=" + result
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
    var datetime = new Date()
    var date = datetime.toLocaleDateString()
    var time = datetime.toLocaleTimeString()

    async.waterfall([
        (callback) =>{
            sql = "insert into bill values (" + req.body.earning +",'"+ date + "','" + time + "','" + req.body.earningTag + "','" + req.body.earPurpose + "'," + 0 + ")"
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
            sql = "update totalMoney set totalMoney=" + newTotal + ",modifiedDate='" + date + "' where totalMoney=" + result
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
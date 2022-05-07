var db = require("../database.js")
var md5 = require("md5")


async function getProducts(req, res) {
    var sql = "select * from product"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}


async function getProduct(req, res, id) {
    var sql = "select * from product where user_id = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}


async function createProduct(req, res) {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.user_id){
        errors.push("No user_id specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        user_id: req.body.user_id,
        description: req.body.description,
        price: req.body.price,
    }
    var sql ='INSERT INTO product (name, user_id, description, price) VALUES (?,?,?,?)'
    var params =[data.name, data.user_id, data.description, data.price]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });  
}


async function updateProduct(req, res, id) {
    var data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    }
    db.run(
        `UPDATE product set 
           name = coalesce(?,name), 
           description = COALESCE(?,description), 
           price = coalesce(?,price) 
           WHERE id = ?`,
        [data.name, data.description, data.price, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
}



module.exports = {
    getProducts, getProduct, createProduct, updateProduct,
    
}
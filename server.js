var express = require("express")
var app = express()


const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./controllers/userController')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
var products = require('./routes/product.js')





app.use('/api/product', products)


app.get("/api/users", (req, res, next) => {
   getUsers(req, res)
});

app.get("/api/user/:id", (req, res, next) => {
   getUser(req, res)
});

app.post("/api/user/", (req, res, next) => {
    createUser(req, res)
})

app.patch("/api/user/:id", (req, res, next) => {
   updateUser(req, res)
})

app.delete("/api/user/:id", (req, res, next) => {
  deleteUser
})



// Start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});

var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text,  email text UNIQUE,  password text,   CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["username","user@email.com",md5("123456")])
            }
        });  
        db.run(`CREATE TABLE product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            user_id INTEGER,
            description text, 
            price text, 
            FOREIGN KEY(user_id) REFERENCES user(id)
            )`,
    (err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO product (name, price, description, user_id) VALUES (?,?,?,?)'
            db.run(insert, ["iphone", "99.9", "iphone description text", 2 ])
        }
    }); 
    }
});


module.exports = db


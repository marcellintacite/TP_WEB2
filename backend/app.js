const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

let app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove
app.use(express.urlencoded({ extended: true })); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
app.use(express.json()); // New

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_projet",
});

// Get all beers
app.get("/produits", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from produits", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from beer table are: \n", rows);
    });
  });
});

app.get("/produits/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM produits WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }

        console.log("The data from beer table are: \n", rows);
      }
    );
  });
});

app.post("/commandes", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query("INSERT INTO commandes SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.send("Commandes ajoutées avec succes");
      } else {
        console.log(err);
      }
      console.log("Données ]\n", rows);
    });
  });
});

// Listen on enviroment port or 5000

app.get("/categories", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from categorie", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from beer table are: \n", rows);
    });
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));

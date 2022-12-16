const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");

let app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove
app.use(express.urlencoded({ extended: true })); // New
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
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

//Ajout des produits
app.post("/produits", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query("INSERT INTO produits SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.send("Produit ajouté avec succèss");
      } else {
        console.log(err);
      }
      console.log("Données ]\n", rows);
    });
  });
});

//Suppression produit

app.delete("/produits/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM produits WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.send(
            `Le produit avec l'id: ${[
              req.params.id,
            ]} a été supprimé avec succes.`
          );
        } else {
          console.log(err);
        }

        console.log("The data from beer table are: \n", rows);
      }
    );
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

//liste des catégories
app.get("/categories/name", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT nomCategorie from categorie", (err, rows) => {
      connection.release(); // return the connection to pool
      const re = rows.map((a) => a.nomCategorie);
      console.log(re);
      if (!err) {
        res.send(re);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from beer table are: \n", rows);
    });
  });
});

//Login user
app.post("/auth", (request, response) => {
  //Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      connection.query(
        "SELECT * FROM utilisateurs WHERE username = ? AND password = ?",
        [username, password],
        function (error, results, fields) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user

            const dat = results[0];

            // Redirect to home page
            response.send({ username: dat.username, email: dat.adresseMail });
          } else {
            response.send("Mot de passe ou nom utilisateur incorrect!");
          }
          response.end();
        }
      );
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

//demandes des utilisateurs
app.get("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from utilisateurs", (err, rows) => {
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

app.get("/commandes", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from commandes", (err, rows) => {
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

//Ajouter un utilisateur
app.post("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query("INSERT INTO utilisateurs SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.send("Utilisateurs ajoutées avec succes");
      } else {
        console.log(err);
      }
      console.log("Données ]\n", rows);
    });
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root999",
  database: "studentSystem",
});

app.get("/student", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const faculty = req.body.faculty;
  const major = req.body.major;

  db.query(
    "INSERT INTO student (name, age, faculty, major) VALUES(?,?,?,?)",
    [name, age, faculty, major],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query(
      "UPDATE student SET name = ? WHERE id = ?",
      [name, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.put("/update", (req, res) => {
  const id = req.body.id;
  const age = req.body.age;
  db.query(
    "UPDATE student SET age = ? WHERE id = ?",
    [age, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete/:id', (req,res) => {
    const id =req.params.id;
    db.query("DELETE FROM student WHERE id = ?", id , (err,result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});

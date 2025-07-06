import express from "express";
import bodyParser from "body-parser";
const app = express();
import pg from "pg";
import axios from "axios";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "",
  port: 5432,
});
db.connect();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM mybooks");
  
  res.render("index.ejs", { books: result.rows });
});
app.get("/new", (req, res) => {
  res.render("add.ejs");
});

app.post("/new", async (req, res) => {
  const title = req.body.title;
  const summary = req.body.summary;
  const data = await axios.get(
    `https://openlibrary.org/search.json?title=${title}`
  );
  const coverid = data.data.docs[0].cover_i;

  const url = `https://covers.openlibrary.org/b/id/${coverid}-L.jpg`;
  await db.query("INSERT INTO mybooks(title,summary,url) VALUES ($1,$2,$3)", [
    title,
    summary,
    url,
  ]);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const response = await db.query("SELECT * FROM mybooks WHERE id=$1", [id]);
  res.render("edit.ejs", {
    book: response.rows[0],
  });
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  var { title, summary } = req.body;
  await db.query("UPDATE mybooks SET title = $1, summary = $2 WHERE id = $3", [title, summary, id]);
  
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE from mybooks WHERE id=$1", [id]);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

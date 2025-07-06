# 📚 Book Management App

This is a simple Book Management web application built using **Node.js**, **Express.js**, **PostgreSQL**, and **EJS** as the templating engine.

## 📁 Folder Structure

```
├── node_modules/
├── public/              # Static assets (CSS, JS, Images)
├── views/               # EJS view templates
│   ├── add.ejs
│   ├── edit.ejs
│   └── index.ejs
├── index.js             # Main server file
├── package.json         # Project metadata and dependencies
├── package-lock.json
```

## 🚀 Features

- Add a new book (title, summary)
- View list of all books
- Edit or update book details
- Delete books

## 🛠️ Technologies Used

- Node.js
- Express.js
- PostgreSQL (with `pg` module)
- EJS for templating
- Bootstrap (optional via CDN for UI)

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-management-app.git
cd book-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL

Create a database named `books` and a table using:

```sql
CREATE TABLE mybooks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT
);
```

### 4. Configure Database

Update credentials in `index.js`:

```js
const db = new pg.Client({
  user: "your_pg_user",
  host: "localhost",
  database: "books",
  password: "your_pg_password",
  port: 5432,
});
```

### 5. Start the server

```bash
node index.js
```

Open `http://localhost:3000` in your browser.

## 📃 License

This project is for educational purposes only.

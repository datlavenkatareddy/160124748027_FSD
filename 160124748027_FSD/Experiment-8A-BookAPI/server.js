const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 500 },
  { id: 2, title: "Ikigai", author: "Hector Garcia", price: 350 },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 450 }
];
app.get("/", (req, res) => res.send("Book API is running"));
app.get("/api/books", (req, res) => res.json(books));
app.get("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});
app.post("/api/books", (req, res) => {
  const { title, author, price } = req.body;
  if (!title || !author || !price) return res.status(400).json({ message: "All fields required" });
  const book = { id: books.length + 1, title, author, price };
  books.push(book);
  res.status(201).json(book);
});
app.put("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  Object.assign(book, req.body);
  res.json(book);
});
app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  const deleted = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deleted[0] });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

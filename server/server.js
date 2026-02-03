const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("✅ Connected to SQLite database");
    
    // Create items table
db.run(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  itemName TEXT NOT NULL,
  category TEXT,
  description TEXT,
  type TEXT CHECK(type IN ('lost', 'found')),
  location TEXT,
  contact TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'returned')),
  date DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) {
    console.error("Error creating items table:", err);
  } else {
    console.log("✅ Items table ready");
  }
});
    
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error("Error creating users table:", err);
      } else {
        console.log("✅ Users table ready");
      }
    });
  }
});

// ============ ITEM ROUTES ============
// Add new item
app.post("/api/items", (req, res) => {
  const { itemName, category, description, type, location, contact } = req.body;
  
  if (!itemName || !type || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  db.run(
    `INSERT INTO items (itemName, category, description, type, location, contact) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [itemName, category || "", description || "", type, location, contact || ""],
    function(err) {
      if (err) {
        console.error("Database insert error:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.json({ 
          id: this.lastID, 
          ...req.body,
          message: "Item added successfully" 
        });
      }
    }
  );
});

// Get all items (with optional status filter)
app.get("/api/items", (req, res) => {
  const { status } = req.query;
  let query = "SELECT * FROM items";
  let params = [];
  
  if (status === 'active') {
    query += " WHERE status = 'active'";
  } else if (status === 'returned') {
    query += " WHERE status = 'returned'";
  }
  
  query += " ORDER BY date DESC";
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get single item by ID
app.get("/api/items/:id", (req, res) => {
  db.get("SELECT * FROM items WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(row);
    }
  });
});

// Delete item
app.delete("/api/items/:id", (req, res) => {
  db.run("DELETE FROM items WHERE id = ?", [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
});
// Mark item as returned
app.put("/api/items/:id/return", (req, res) => {
  db.run(
    "UPDATE items SET status = 'returned' WHERE id = ? AND status = 'active'",
    [req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Item not found or already returned" });
      } else {
        res.json({ message: "Item marked as returned successfully" });
      }
    }
  );
});

// Get active items only
app.get("/api/items/active", (req, res) => {
  db.all("SELECT * FROM items WHERE status = 'active' ORDER BY date DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// ============ USER ROUTES ============
// Register user
app.post("/api/users/register", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function(err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint")) {
          res.status(400).json({ error: "Email already registered" });
        } else {
          res.status(500).json({ error: err.message });
        }
      } else {
        res.json({ 
          id: this.lastID, 
          name, 
          email,
          message: "User registered successfully" 
        });
      }
    }
  );
});

// Login user (simple version - no encryption for now)
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  
  db.get(
    "SELECT id, name, email FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!row) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        res.json({ 
          user: row,
          message: "Login successful" 
        });
      }
    }
  );
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Lost & Found API is running",
    endpoints: {
      items: {
        getAll: "GET /api/items",
        add: "POST /api/items",
        getOne: "GET /api/items/:id",
        delete: "DELETE /api/items/:id"
      },
      users: {
        register: "POST /api/users/register",
        login: "POST /api/users/login"
      }
    }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
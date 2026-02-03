import React, { useState } from "react";
import { addItem } from "../services/api";

function AddItem() {
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    description: "",
    type: "lost",
    location: "",
    contact: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addItem(form);
      alert(result.message || "Item added successfully!");
      // Clear form
      setForm({
        itemName: "",
        category: "",
        description: "",
        type: "lost",
        location: "",
        contact: "",
      });
      // Refresh page to show new item
      window.location.reload();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Report Lost or Found Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Item Name *</label>
          <input
            type="text"
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            placeholder="e.g., iPhone, Wallet, Keys"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g., Electronics, Documents, Clothing"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Color, brand, special features..."
            style={styles.textarea}
            rows="3"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Type *</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="lost">I Lost This Item</option>
            <option value="found">I Found This Item</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Where was it lost/found?"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Contact Info</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Email or phone number"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    resize: "vertical",
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AddItem;
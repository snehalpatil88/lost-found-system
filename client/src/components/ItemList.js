import React, { useEffect, useState } from "react";
import { getItems, deleteItem, markAsReturned } from "../services/api";

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReturned, setShowReturned] = useState(false);
  const [filterType, setFilterType] = useState("all"); // all, lost, found

  const fetchItems = async () => {
    try {
      const status = showReturned ? "" : "active";
      const data = await getItems(status);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [showReturned]);

  const handleMarkReturned = async (id) => {
    if (window.confirm("Mark this item as returned to owner?")) {
      try {
        await markAsReturned(id);
        alert("Item marked as returned!");
        fetchItems(); // Refresh list
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        fetchItems(); // Refresh list
        alert("Item deleted successfully!");
      } catch (error) {
        alert("Error deleting item: " + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredItems = items.filter(item => {
    if (filterType === "all") return true;
    if (filterType === "lost") return item.type === "lost";
    if (filterType === "found") return item.type === "found";
    return true;
  });

  if (loading) {
    return <div style={styles.loading}>Loading items...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {showReturned ? "All Items History" : "Active Lost & Found Items"}
        </h2>
        
        <div style={styles.controls}>
          <div style={styles.toggle}>
            <button
              onClick={() => setShowReturned(false)}
              style={{
                ...styles.toggleButton,
                backgroundColor: !showReturned ? "#4CAF50" : "#ccc",
                color: !showReturned ? "white" : "#333"
              }}
            >
              Active Items
            </button>
            <button
              onClick={() => setShowReturned(true)}
              style={{
                ...styles.toggleButton,
                backgroundColor: showReturned ? "#4CAF50" : "#ccc",
                color: showReturned ? "white" : "#333"
              }}
            >
              Show History
            </button>
          </div>
          
          <div style={styles.filter}>
            <label style={styles.filterLabel}>Filter by: </label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Types</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={styles.empty}>
          {showReturned 
            ? "No returned items in history." 
            : "No active items found. Be the first to report!"}
        </div>
      ) : (
        <div style={styles.itemsContainer}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.itemCard,
                backgroundColor: item.status === 'returned' ? '#f8f9fa' : 
                                item.type === 'lost' ? '#fff3cd' : '#d4edda',
                borderLeft: `5px solid ${
                  item.status === 'returned' ? '#6c757d' :
                  item.type === 'lost' ? '#f39c12' : '#28a745'
                }`,
                opacity: item.status === 'returned' ? 0.8 : 1
              }}
            >
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>
                  <span style={styles.itemName}>{item.itemName}</span>
                  <div style={styles.badges}>
                    <span
                      style={{
                        ...styles.typeBadge,
                        backgroundColor: item.type === 'lost' ? '#f39c12' : '#28a745',
                      }}
                    >
                      {item.type.toUpperCase()}
                    </span>
                    {item.status === 'returned' && (
                      <span style={styles.returnedBadge}>
                        ✅ RETURNED
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.itemDetails}>
                {item.category && (
                  <div style={styles.detailRow}>
                    <strong>Category:</strong> {item.category}
                  </div>
                )}
                {item.description && (
                  <div style={styles.detailRow}>
                    <strong>Description:</strong> {item.description}
                  </div>
                )}
                <div style={styles.detailRow}>
                  <strong>Location:</strong> {item.location}
                </div>
                {item.contact && (
                  <div style={styles.detailRow}>
                    <strong>Contact:</strong> {item.contact}
                  </div>
                )}
                <div style={styles.date}>
                  Reported on: {formatDate(item.date)}
                </div>
              </div>

              <div style={styles.actions}>
                {item.status === 'active' && (
                  <button
                    onClick={() => handleMarkReturned(item.id)}
                    style={styles.returnButton}
                  >
                    ✅ Mark as Returned
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  title: {
    color: "#333",
    margin: 0,
  },
  controls: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  toggle: {
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  toggleButton: {
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s",
  },
  filter: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filterLabel: {
    fontSize: "14px",
    color: "#555",
  },
  filterSelect: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#666",
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
  },
  itemsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px",
  },
  itemCard: {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    transition: "all 0.3s",
  },
  itemHeader: {
    marginBottom: "15px",
  },
  itemTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "10px",
  },
  itemName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  typeBadge: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  returnedBadge: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  itemDetails: {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  detailRow: {
    marginBottom: "8px",
  },
  date: {
    marginTop: "10px",
    color: "#888",
    fontSize: "14px",
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  returnButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ItemList;
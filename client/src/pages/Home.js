import React from "react";
import AddItem from "../components/AddItem";
import ItemList from "../components/ItemList";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find What You Lost, Return What You Found</h1>
        <p style={styles.heroText}>
          A community platform to report lost items and help others find their belongings.
        </p>
      </div>
      
      <div style={styles.content}>
        <AddItem />
        <ItemList />
      </div>
      
      <footer style={styles.footer}>
        <p>© 2024 Lost & Found System. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  hero: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "40px 20px",
    textAlign: "center",
    marginBottom: "30px",
  },
  heroTitle: {
    fontSize: "2.5rem",
    marginBottom: "15px",
  },
  heroText: {
    fontSize: "1.2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  footer: {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "50px",
  },
};

export default Home;
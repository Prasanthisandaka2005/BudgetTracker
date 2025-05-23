import React from "react";

const Navbar = ({ onToggleSidebar }) => {
    return (
        <nav style={styles.navbar}>
            <button style={styles.menuButton} onClick={onToggleSidebar}>
                ☰
            </button>
            <h1 style={{ margin: 0 }}>Budget Tracker</h1>
        </nav>
    );
};

const styles = {
    navbar: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        backgroundColor: "#2c3e50",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        zIndex: 1000,
    },
    menuButton: {
        fontSize: "24px",
        marginRight: "20px",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
    },
};

export default Navbar;

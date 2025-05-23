import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, menuItems }) => {
    return (
        <aside
            style={{
                ...styles.sidebar,
                left: isOpen ? 0 : "-250px",
            }}
        >
            <button onClick={onClose} style={styles.closeButton}>
                &times;
            </button>

            <ul style={styles.menuList}>
                {menuItems.map(({ id, label, link }) => (
                    <li key={id} style={styles.menuItem}>
                        <Link to={link}>{label}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const styles = {
    sidebar: {
        position: "fixed",
        top: "50px",
        left: 0,
        width: "250px",
        height: "100%",
        backgroundColor: "#34495e",
        color: "white",
        padding: "16px",
        transition: "left 0.3s ease",
        zIndex: 999,
        boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
    },
    closeButton: {
        fontSize: "28px",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        marginBottom: "20px",
    },
    menuList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    menuItem: {
        marginBottom: "12px",
    },
    menuButton: {
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
        textAlign: "left",
        width: "100%",
    },
};

export default Sidebar;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import './index.css'

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [sidebarOpen, setSidebarOpen] = useState(true);


    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    const menuItems = [
        { id: "1", label: "Dashboard", link: '/' },
        { id: "2", label: "Other Costs", link: '/other-costs' },
        { id: "3", label: "Items", link: '/items' },
    ];

    return (
        <>
            <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

            <div className="mainContainer">
                <div className="sidebar">
                    <Sidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        menuItems={menuItems}
                    />
                </div>

                {children}

            </div>
        </>
    )
};

export default ProtectedRoute;

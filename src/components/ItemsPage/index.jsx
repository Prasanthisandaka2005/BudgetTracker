import React, { useEffect, useState } from "react";
import {
    addItem,
    deleteItem,
    editItem,
    fetchItems,
} from "../Firebase/firestoreService";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ name: "", cost: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadItems = async () => {
        setLoading(true);
        const data = await fetchItems();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        if (!formData.name.trim() || !formData.cost || isNaN(formData.cost) || formData.cost <= 0) {
            alert("Please enter valid name and positive cost");
            return;
        }
        await addItem(formData.name.trim(), parseFloat(formData.cost));
        setFormData({ name: "", cost: "" });
        loadItems();
    };

    const handleEditStart = (item) => {
        setEditingId(item.id);
        setFormData({ name: item.name, cost: item.cost.toString() });
    };

    const handleEditSave = async (id) => {
        if (!formData.name.trim() || !formData.cost || isNaN(formData.cost) || formData.cost <= 0) {
            alert("Please enter valid name and positive cost");
            return;
        }
        await editItem(id, {
            name: formData.name.trim(),
            cost: parseFloat(formData.cost),
        });
        setEditingId(null);
        setFormData({ name: "", cost: "" });
        loadItems();
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setFormData({ name: "", cost: "" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteItem(id);
            loadItems();
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h2>Manage Items</h2>

            {!editingId && (
                <div
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        border: "1px solid #ccc",
                        borderRadius: 5,
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h3>Add New Item</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Item name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ padding: 8, marginRight: 10, width: "60%" }}
                    />
                    <input
                        type="number"
                        name="cost"
                        placeholder="Cost"
                        value={formData.cost}
                        onChange={handleChange}
                        style={{ padding: 8, marginRight: 10, width: "20%" }}
                    />
                    <button onClick={handleAdd} style={{ padding: "8px 12px" }}>
                        Add
                    </button>
                </div>
            )}

            {loading ? (
                <p>Loading items...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #333" }}>
                            <th style={{ padding: 8 }}>Name</th>
                            <th style={{ padding: 8 }}>Cost</th>
                            <th style={{ padding: 8, width: 150 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) =>
                            editingId === item.id ? (
                                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                                    <td style={{ padding: 8 }}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ width: "90%", padding: 6 }}
                                        />
                                    </td>
                                    <td style={{ padding: 8 }}>
                                        <input
                                            type="number"
                                            name="cost"
                                            value={formData.cost}
                                            onChange={handleChange}
                                            style={{ width: "90%", padding: 6 }}
                                        />
                                    </td>
                                    <td style={{ padding: 8 }}>
                                        <button onClick={() => handleEditSave(item.id)} style={{ marginRight: 8 }}>
                                            Save
                                        </button>
                                        <button onClick={handleEditCancel}>Cancel</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                                    <td style={{ padding: 8 }}>{item.name}</td>
                                    <td style={{ padding: 8 }}>${parseFloat(item.cost).toFixed(2)}</td>
                                    <td style={{ padding: 8 }}>
                                        <button onClick={() => handleEditStart(item)} style={{ marginRight: 8 }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ItemsPage;

import React, { useEffect, useState } from "react";
import {
    fetchOtherCosts,
    addOtherCost,
    deleteOtherCost,
    editOtherCost,
} from "../Firebase/firestoreService";

const OtherCostsPage = () => {
    const [otherCosts, setOtherCosts] = useState([]);
    const [formData, setFormData] = useState({ description: "", amount: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadCosts = async () => {
        setLoading(true);
        const costs = await fetchOtherCosts();
        setOtherCosts(costs);
        setLoading(false);
    };

    useEffect(() => {
        loadCosts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        if (!formData.description.trim() || !formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
            alert("Please enter valid description and positive amount");
            return;
        }
        await addOtherCost(formData.description.trim(), parseFloat(formData.amount));
        setFormData({ description: "", amount: "" });
        await loadCosts();
    };

    const handleEditStart = (cost) => {
        setEditingId(cost.id);
        setFormData({ description: cost.description, amount: cost.amount.toString() });
    };

    const handleEditSave = async (id) => {
        if (!formData.description.trim() || !formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
            alert("Please enter valid description and positive amount");
            return;
        }
        await editOtherCost(id, {
            description: formData.description.trim(),
            amount: parseFloat(formData.amount),
        });
        setEditingId(null);
        setFormData({ description: "", amount: "" });
        await loadCosts();
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setFormData({ description: "", amount: "" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this cost?")) {
            await deleteOtherCost(id);
            await loadCosts();
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h2>Manage Other Costs</h2>

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
                    <h3>Add New Other Cost</h3>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ padding: 8, marginRight: 10, width: "60%" }}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        style={{ padding: 8, marginRight: 10, width: "20%" }}
                    />
                    <button onClick={handleAdd} style={{ padding: "8px 12px" }}>
                        Add
                    </button>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #333" }}>
                            <th style={{ padding: 8 }}>Description</th>
                            <th style={{ padding: 8 }}>Amount</th>
                            <th style={{ padding: 8, width: 150 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {otherCosts.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ padding: 8, textAlign: "center" }}>
                                    No costs found.
                                </td>
                            </tr>
                        )}
                        {otherCosts.map((cost) =>
                            editingId === cost.id ? (
                                <tr key={cost.id} style={{ borderBottom: "1px solid #ccc" }}>
                                    <td style={{ padding: 8 }}>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            style={{ width: "90%", padding: 6 }}
                                        />
                                    </td>
                                    <td style={{ padding: 8 }}>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            style={{ width: "90%", padding: 6 }}
                                        />
                                    </td>
                                    <td style={{ padding: 8 }}>
                                        <button onClick={() => handleEditSave(cost.id)} style={{ marginRight: 8 }}>
                                            Save
                                        </button>
                                        <button onClick={handleEditCancel}>Cancel</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={cost.id} style={{ borderBottom: "1px solid #ccc" }}>
                                    <td style={{ padding: 8 }}>{cost.description}</td>
                                    <td style={{ padding: 8 }}>${parseFloat(cost.amount).toFixed(2)}</td>
                                    <td style={{ padding: 8 }}>
                                        <button onClick={() => handleEditStart(cost)} style={{ marginRight: 8 }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(cost.id)}>Delete</button>
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

export default OtherCostsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/itemsSlice";
import { fetchOtherCosts } from "../../features/otherCostsSlice";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const otherCosts = useSelector((state) => state.otherCosts.otherCosts);
    console.log(items)

    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchOtherCosts());
    }, [dispatch]);

    const totalItemsCost = items.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const totalOtherCosts = otherCosts.reduce((sum, cost) => sum + (Number(cost.amount) || 0), 0);
    const totalProjectCost = totalItemsCost + totalOtherCosts;

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif", marginTop: '5rem' }}>
            <h1>Project Dashboard</h1>
            <div
                style={{
                    backgroundColor: "#e3f2fd",
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 30,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
            >
                <h2>Total Project Cost</h2>
                <p style={{ fontSize: 24, fontWeight: "bold" }}>
                    {totalProjectCost.toFixed(2)} Rs
                </p>
            </div>

            <div style={{ marginBottom: 20 }}>
                <h3>Items Summary</h3>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.name}: {Number(item.cost || 0).toFixed(2)} Rs
                        </li>
                    ))}
                </ul>
                <p>
                    <strong>Total Items Cost:</strong> {totalItemsCost.toFixed(2)} Rs
                </p>
            </div>

            <div>
                <h3>Other Costs Summary</h3>
                <ul>
                    {otherCosts.map((cost) => (
                        <li key={cost.id}>
                            {cost.description}: ${Number(cost.amount || 0).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p>
                    <strong>Total Other Costs:</strong> ${totalOtherCosts.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

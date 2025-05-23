import { auth, db } from "./firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    getDocs,
} from "firebase/firestore";

export const addItem = async (name, cost) => {
    const userId = auth.currentUser.uid;
    await addDoc(collection(db, "Users", userId, "items"), {
        cost: {
            name,
            cost,
            date: new Date().toISOString(),
        },
        createdAt: new Date(),
        name: userId,
    });
};

export const fetchItems = async () => {
    const userId = auth.currentUser.uid;
    try {
        const itemsRef = collection(db, "Users", userId, "items");
        const snapshot = await getDocs(itemsRef);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.cost?.name || "Unnamed Item",
                cost: data.cost?.cost || 0,
                createdAt: data.createdAt?.toDate().toISOString() || null,
            };
        });
    } catch (error) {
        console.error("Error fetching items:", error.message);
        return [];
    }
};


export const deleteItem = async (itemId) => {
    const userId = auth.currentUser.uid;
    try {
        const itemDocRef = doc(db, "Users", userId, "items", itemId);
        await deleteDoc(itemDocRef);
    } catch (error) {
        console.error("Error deleting item:", error.message);
    }
};

export const editItem = async (id, { name, cost }) => {
    const userId = auth.currentUser.uid;
    const docRef = doc(db, "Users", userId, "items", id);
    await updateDoc(docRef, {
        cost: {
            name,
            cost,
            date: new Date().toISOString(),
        },
        createdAt: new Date(),
        name: userId,
    });
};

export const addOtherCost = async (description, amount) => {
    const userId = auth.currentUser.uid;
    try {
        await addDoc(collection(db, `Users/${userId}/otherCosts`), {
            description,
            amount,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding other cost:", error.message);
    }
};

export const fetchOtherCosts = async () => {
    const userId = auth.currentUser.uid;
    try {
        const otherCostsRef = collection(db, "Users", userId, "otherCosts");
        const snapshot = await getDocs(otherCostsRef);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate().toISOString() || null,
            };
        });
    } catch (error) {
        console.error("Error fetching other costs:", error.message);
        return [];
    }
};


export const deleteOtherCost = async (otherCostId) => {
    const userId = auth.currentUser.uid;
    try {
        const otherCostDocRef = doc(db, "Users", userId, "otherCosts", otherCostId);
        await deleteDoc(otherCostDocRef);
    } catch (error) {
        console.error("Error deleting other cost:", error.message);
    }
};

export const editOtherCost = async (otherCostId, updatedData) => {
    const userId = auth.currentUser.uid;
    try {
        const otherCostDocRef = doc(db, "Users", userId, "otherCosts", otherCostId);
        await updateDoc(otherCostDocRef, updatedData);
    } catch (error) {
        console.error("Error editing other cost:", error.message);
    }
};
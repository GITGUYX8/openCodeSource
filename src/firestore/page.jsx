import { getFirestore, collection, addDoc, getDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { firebaseApp } from "@/context/firebase";
import { useState, useEffect } from "react";
import { getRepoData } from "@/github/github";

const firestore = getFirestore(firebaseApp)

/**
 * Writes a new document to the 'entries' collection.
 * @param {object} data - The project data to add.
 */
export const writeData = async (data) => {
    if (!data) {
        console.error("No data provided to write.");
        return;
    }
    try {
        const result = await addDoc(collection(firestore, "entries"), data);
        console.log("Data written successfully with ID:", result.id);
        return result;
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

/**
 * Reads a single document from a collection.
 * @param {string} collectionName - The name of the collection.
 */
export const readAllDataFromCollection = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        const results = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            results.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Data from ${collectionName}:`, results);
        return results;
    } catch (error) {
        console.error(`Error reading collection ${collectionName}:`, error);
    }
};

export const dataByQuery = async () => {
    // Note: Your query was for author === true in the 'cities' collection.
    // This might be a placeholder. I'll leave it as is.
    const collectionRef = collection(firestore, "cities");
    const q = query(collectionRef, where("author", "==", "Priya Sharma" ));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
    console.log("Query results:", results);
    return results;
};

/**
 * Updates a document in the 'cities' collection.
 * @param {string} docId - The ID of the document to update.
 * @param {object} dataToUpdate - The data to update.
 */
export const updateData = async (docId, dataToUpdate) => {
    const docRef = doc(firestore, 'cities', docId);
    await updateDoc(docRef, dataToUpdate);
    console.log(`Document with ID ${docId} has been updated.`);
};

export function FirestoreData() {
    const [repoData, setRepoData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const data = await getRepoData("facebook", "react");
        setRepoData(data);
      }
      fetchData();
    }, []);

    return (
        <div className="FirestoreData">
            <h1>firestore</h1>

            <button onClick={() => writeData(repoData)} className="bg-amber-700 rounded-2xl p-2">Put data</button>
            <button onClick={() => readAllDataFromCollection("entries")} className="bg-amber-700 rounded-2xl p-2">get data</button>
            <button onClick={dataByQuery} className="bg-amber-700 rounded-2xl p-2">get data by query</button>
            <button onClick={() => updateData('qgvSaZRYEMQIcizdjQsN', { name: "New Delhi" })} className="bg-amber-700 rounded-2xl p-2">update data</button>
        </div>
    )
}

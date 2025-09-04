import { getFirestore, collection, addDoc, getDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { firebaseApp } from "@/context/firebase";
import CardData from "@/data/CardData";
import { useState, useEffect } from "react";
import { getRepoData } from "@/github/github";

const firestore = getFirestore(firebaseApp)


export function FirestoreData() {
    const [repoData, setRepoData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const data = await getRepoData("facebook", "react");
        setRepoData(data);
      }
      fetchData();
    }, []);

    const writeData = async () => {
        if (!repoData) return;
        const result = await addDoc(collection(firestore, "entries"), {
            entry: repoData.title,
            title: repoData.title,
            description: repoData.description,
            author: repoData.author,
        })
        console.log("result", result)
    }

    const  readData = async () =>  {
        const ref = doc(firestore, "entries_project", "AQwuZsP9ScQ5nlDvbQST")
        const snap = await getDoc(ref)
        console.log(snap.data())    

    }
    const dataByQuery = async () => {
        const collectionRef = collection(firestore, "cities")
        const q = query(collectionRef, where("pinCode", "==", "123"))
        const snap = await getDocs(q)
        snap.forEach(data => { console.log(data.data())})
       
    }
    const update = async () => {
        const docRef = doc(firestore, 'cities', 'qgvSaZRYEMQIcizdjQsN')
        await updateDoc(docRef, {
            name: "new Delhi"
        })
        console.log("updated check plz")
    }
    return (
        <div className="FirestoreData">
            <h1>firestore</h1>
            <button onClick={writeData} className="bg-amber-700 rounded-2xl p-2">Put data</button>
            <button onClick={readData} className="bg-amber-700 rounded-2xl p-2">get data</button>
            <button onClick={dataByQuery} className="bg-amber-700 rounded-2xl p-2">get data by query</button>
            <button onClick={update} className="bg-amber-700 rounded-2xl p-2">update data</button>
        </div>
    )
}
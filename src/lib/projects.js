"use client";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "@/context/firebase";

const db = getFirestore(firebaseApp);

export async function addProject(project) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project data");
  }

  const data = {
    ...project,
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "entries"), data);
  return { id: ref.id };
}
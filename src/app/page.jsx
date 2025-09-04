"use client"
import SignupPage from "../pages/SignupPage"
import SigninPage from "@/pages/SigninPage";
import ProjectCard from "@/components/ProjectCard";
import CardData from "@/data/CardData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FirebaseProvider} from "@/context/firebase";
import { FirestoreData } from "@/firestore/page";
import { getRepoData } from "@/github/github";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRepoData("facebook", "react");
  
      console.log(data);

      setRepoData(data);
    }
    fetchData();
  }, []);

  return (
    <>  
    <FirebaseProvider>
  {/* <SignupPage/>
  <SigninPage /> */}
  <Header/>
  {/* <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {CardData.map((project) => (
          <ProjectCard key={project.entry} {...project} /> //it return a project every time from CardData 
        ))}
      </main> */}

    <FirestoreData/>
  <Footer/>
    </FirebaseProvider>

    </>
  )
}  


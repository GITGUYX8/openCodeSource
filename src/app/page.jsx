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
import AddProjectForm from "@/components/AddProjectPage";
import React, { useEffect, useState } from "react";
import firebase from "../context/firebase";
import { readAllDataFromCollection } from "@/firestore/page";
export default function Home() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    readAllDataFromCollection("entries").then(data => {
      setProjects(data);
      console.log(projects);
    });

  }, []);


  return (
    <>  
    <FirebaseProvider>
  {/* <SignupPage/>
  <SigninPage /> */}
  <Header/>
  <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project) => (
          <ProjectCard key={project.entry} 
            image={project.image}
            title={project.title}
            description={project.description}
            author={project.author}
            college={project.college}
            year={project.year}
            skills={project.skills}
            bounty={project.bounty}
            stars={project.stars}
            contributors={project.contributors}
            prs={project.prs}
            posted={project.posted}
           /> //it return a project every time from CardData 
        ))}
      </main>
  {/* <AddProjectForm/> */}
    <FirestoreData/>
  <Footer/>
    </FirebaseProvider>

    </>
  )
}  


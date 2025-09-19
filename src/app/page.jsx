"use client"
import ProjectCard from "@/components/ProjectCard";
import React, { useEffect, useState } from "react";
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
        />
      ))}
    </main>
  )
}  


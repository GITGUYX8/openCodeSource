"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { readAllDataFromCollection } from "@/firestore/page";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readAllDataFromCollection("entries").then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">
        All Projects
      </h1>
      {loading ? (
        <p className="text-center">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
                            key={project.entry}
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
        </div>
      )}
    </main>
  );
}
"use client"
import ProjectCard from "@/components/ProjectCard";
import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
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
    <Fragment>
      <main className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-8rem)]">
          <div className="max-w-4xl py-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
              Build the Future, Together.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              OpenCodeSource is the ultimate platform for developers to discover,
              contribute to, and showcase open-source projects. Join our community
              and start making an impact today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-600"
              >
                Get Started
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-transparent px-6 py-3 text-base font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Explore Projects
              </Link>
            </div>
          </div>
          {/* Scroll Down Arrow */}
          <Link href="#features" className="absolute bottom-10 animate-bounce">
            <svg
              className="w-8 h-8 text-zinc-500 dark:text-zinc-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
        </section>
      </main>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg mx-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Why OpenCodeSource?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to thrive in the open-source world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Discover</h3>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Find trending and interesting open-source projects that match
                your skills and interests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Contribute</h3>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Easily track your contributions, get recognized for your work,
                and build your developer profile.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Collaborate</h3>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Connect with a global community of developers, maintainers, and
                mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="w-full py-24 mx-auto">
        <div className="container mx-auto text-left">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
        </div>
      </section >
    </Fragment>
  );
}

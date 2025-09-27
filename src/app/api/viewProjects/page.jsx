"use client";

import React, { useEffect, useState, Fragment } from "react";
import ProjectCard from "@/components/ProjectCard";
import { readAllDataFromCollection } from "@/firestore/page";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Categories available
const techCategories = [
  "Web Development",
  "App Development",
  "AI",
  "ML",
  "Data Science",
  "Cybersecurity",
  "Cloud / DevOps",
  "IoT & Embedded Systems",
  "Blockchain",
  "AR/VR",
  "Computer Vision / OpenCV",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    readAllDataFromCollection("entries").then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((project) =>
      selectedCategories.length === 0
        ? true
        : project.categories?.some((cat) =>
            selectedCategories.includes(cat)
          )
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(b.posted) - new Date(a.posted);
      } else if (sortOption === "bounty") {
        return Number(b.bounty) - Number(a.bounty);
      }
      return 0;
    });

  return (
    <main className="relative min-h-screen bg-grid-small-white/[0.2] bg-neutral-950 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Floating decorative blobs */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-blue-600/50 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-purple-600/50 rounded-full filter blur-3xl opacity-40 animate-float2"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
          Explore Projects
        </h1>
        <p className="text-center text-gray-300 mb-12">Find, filter, and sort through community-submitted open-source projects.</p>

      {/* Filter/Search Section */}
        <div className="relative z-10 w-full max-w-4xl mx-auto p-6 mb-12 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition md:w-1/3"
        />

        {/* Categories Multi-Select */}
        <Listbox value={selectedCategories} onChange={setSelectedCategories} multiple>
          <div className="relative w-full md:w-1/3">
            <Listbox.Button className="w-full flex justify-between items-center px-4 py-2 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition">
              {selectedCategories.length > 0
                ? selectedCategories.join(", ")
                : "Filter by categories"}
              <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 w-full bg-neutral-800 border border-white/10 rounded-xl shadow-lg z-20 max-h-60 overflow-auto focus:outline-none">
                {techCategories.map((category) => (
                  <Listbox.Option
                    key={category}
                    value={category}
                    className={({ active }) => `cursor-pointer select-none relative px-4 py-2 flex items-center gap-3 ${
                        active ? "bg-blue-600 text-white" : "text-gray-300"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <input
                          type="checkbox"
                          checked={selected}
                          readOnly
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={selected ? "font-semibold" : "font-normal"}>
                          {category}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Sort By */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition md:w-auto"
        >
          <option value="date">Sort by Date</option>
          <option value="bounty">Sort by Bounty</option>
        </select>
      </div>

      {/* Projects Grid */}
      {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      ) : (
          filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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
          ) : (<p className="text-center text-gray-400 text-lg">No projects found matching your criteria.</p>)
      )}
      </div>
    </main>
  );
} 
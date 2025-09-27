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
    <main className="container mx-auto px-4 py-12 relative">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">
        All Projects
      </h1>

      
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition w-full md:w-1/3"
        />

        
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
              <Listbox.Options className="absolute mt-2 w-full bg-neutral-900 border border-white/10 rounded-xl shadow-lg z-20 max-h-60 overflow-auto">
                {techCategories.map((category) => (
                  <Listbox.Option
                    key={category}
                    value={category}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${
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
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
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

        
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition w-full md:w-1/4"
        >
          <option value="date" className="text-black">Sort by Date</option>
          <option value="bounty" className="text-black">Sort by Bounty</option>
        </select>
      </div>

      
      {loading ? (
        <p className="text-center text-white">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      )}
    </main>
  );
} 
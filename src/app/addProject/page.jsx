"use client";

import { useState, Fragment } from "react";
import { addProject } from "@/lib/projects";
import { getRepoData } from "@/github/github";
import { Listbox, Transition } from "@headlessui/react";
import { FaGithub } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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

export default function AddProjectForm() {
  const [form, setForm] = useState({
    githubUrl: "",
    college: "",
    year: "",
    bounty: "",
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const regex = /github\.com\/([^/]+)\/([^/]+)/;
      const match = form.githubUrl.match(regex);

      if (!match) {
        alert("Invalid GitHub URL");
        setLoading(false);
        return;
      }

      const [_, owner, repo] = match;
      const repoData = await getRepoData(owner, repo);

      if (!repoData) {
        alert("Failed to fetch repo data");
        setLoading(false);
        return;
      }

      const projectData = {
        ...repoData,
        Name: "" ,
        college: form.college,
        year: form.year,
        bounty: form.bounty,
        categories: selectedCategories,
      };

      await addProject(projectData);
      alert("Project added successfully ");

      setForm({ githubUrl: "", college: "", year: "", bounty: "" });
      setSelectedCategories([]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-grid-small-white/[0.2] bg-neutral-950 flex items-center justify-center p-4 overflow-hidden">
      
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

     
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-blue-600/50 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-purple-600/50 rounded-full filter blur-3xl opacity-40 animate-float2"></div>

     
      <div className="relative z-10 w-full max-w-2xl p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaGithub className="w-8 h-8" />
          <h2 className="text-3xl font-bold text-center tracking-tight">Add Project from GitHub</h2>
        </div>
        <p className="text-center text-gray-300 mb-8 -mt-4">Showcase your work by linking a GitHub repository. We'll fetch the details for you!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium mb-1">GitHub Repo URL</label>
            <input
              type="text"
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/owner/repo"
              required  
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">College</label>
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange} 
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange} 
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">Bounty</label>
            <input
              type="text"
              name="bounty"
              value={form.bounty}
              onChange={handleChange} 
              placeholder="₹1000"
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">Categories</label>
           <Listbox value={selectedCategories} onChange={setSelectedCategories} multiple>
  <div className="relative mt-1">
    <Listbox.Button className="w-full flex justify-between items-center px-4 py-2 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition">
      {selectedCategories.length > 0
        ? selectedCategories.join(", ")
        : "Select categories"}
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
            className={({ active }) =>
              `cursor-pointer select-none relative px-4 py-2 flex items-center gap-3 ${
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

          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}

"use client";

import { useState, Fragment } from "react";
import { addProject } from "@/lib/projects";
import { getRepoData } from "@/github/github";
import { Listbox, Transition } from "@headlessui/react";
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
    <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden">
      {/* Floating blue blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float2"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-xl p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Project from GitHub</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* GitHub URL */}
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

          {/* College */}
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

          {/* Year */}
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

          {/* Bounty */}
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

          {/* Categories Multi-Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Categories</label>
           <Listbox value={selectedCategories} onChange={setSelectedCategories} multiple>
  <div className="relative">
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

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-xl font-semibold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}

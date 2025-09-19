"use client";

import { Star, Users, GitPullRequest } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({
  image,
  title,
  description,
  author,
  college,
  year,
  skills,
  bounty,
  stars,
  contributors,
  prs,
  posted,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out max-w-md flex flex-col">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Author */}
        <div className="flex items-center mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-300">
            {author.charAt(0)}
          </div>
          <div className="ml-2">
            <p className="font-medium text-zinc-800 dark:text-zinc-200 text-sm">{author}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{college} • {year}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5"><Star size={16} /> {stars}</span>
          <span className="flex items-center gap-1.5"><Users size={16} /> {contributors}</span>
          <span className="flex items-center gap-1.5"><GitPullRequest size={16} /> {prs}</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5">
          <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
            {bounty}
          </span>

          {/* Updated: Navigate to project page using project name */}
          <Link
            href={`/projects/${encodeURIComponent(title)}`}
            className="bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            View Project
          </Link>
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4 text-right">Posted {posted}</p>
      </div>
    </div>
  );
}

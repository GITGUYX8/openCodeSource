import React from "react";
import Link from "next/link";
import { Users, Target, Zap, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            About OpenSource Campus
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            We are passionate about fostering a vibrant open-source culture
            within the student developer community. Our mission is to connect
            students with projects that matter.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Our Mission
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                The world of open-source can be intimidating for newcomers. Our
                goal is to break down these barriers by creating a platform
                where students can easily find projects, collaborate with peers,
                and gain real-world software development experience.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                We believe that contributing to open-source is one of the best
                ways to learn, grow, and build a strong portfolio. OpenSource
                Campus is the bridge between academic learning and practical
                application.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg text-center">
                <Target className="mx-auto h-10 w-10 text-blue-600" />
                <h3 className="mt-4 font-semibold">Discover</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Find projects that match your interests.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg text-center">
                <Code className="mx-auto h-10 w-10 text-blue-600" />
                <h3 className="mt-4 font-semibold">Contribute</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Gain experience and build your profile.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg text-center">
                <Users className="mx-auto h-10 w-10 text-blue-600" />
                <h3 className="mt-4 font-semibold">Collaborate</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Connect with a community of developers.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg text-center">
                <Zap className="mx-auto h-10 w-10 text-blue-600" />
                <h3 className="mt-4 font-semibold">Grow</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Accelerate your skills and career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Whether you're a student looking for your first contribution or a
            maintainer wanting to mentor the next generation, there's a place
            for you at OpenSource Campus.
          </p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-600"
            >
              Explore Projects
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
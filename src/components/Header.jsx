"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code } from "lucide-react"; // A nice icon for your logo

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/addProject", label: "Add Project" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-lg dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="hidden text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:inline-block">
            OpenSource Campus
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/LoginPage"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Login
          </Link>
          <Link
            href="/SignupPage"
            className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
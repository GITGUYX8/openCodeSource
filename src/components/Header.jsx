import Link from 'next/link';

export default function Header() {
    return (
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">OpenSource Campus</h1>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link href="/projectPage" className="text-gray-600 hover:text-blue-600">Projects</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
        </nav>
      </header>
    );
  }
  
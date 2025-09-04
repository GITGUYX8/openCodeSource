export default function Header() {
    return (
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">OpenSource Campus</h1>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="/projects" className="text-gray-600 hover:text-blue-600">Projects</a>
          <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
        </nav>
      </header>
    );
  }
  
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-red-600">SIGNA</h1>
        </div>
        <nav className="mt-6">
          <Link href="/" className="block py-2.5 px-4 bg-gray-200 text-gray-800 font-semibold">
            Trademark Records
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
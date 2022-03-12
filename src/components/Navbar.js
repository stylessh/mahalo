import Link from "next/link";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center py-6 w-[90%] mx-auto">
      <Link href="/">
        <a className="font-bold text-2xl">Mahalo</a>
      </Link>

      <nav className="space-x-6">
        <Link href="/feedback">
          <a className="text-gray-500">Help us improve</a>
        </Link>

        <Link href="/access">
          <a className="inline-block bg-purple-400 px-4 py-2 rounded-full text-white font-bold">
            Get early access
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

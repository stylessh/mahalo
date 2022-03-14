import Link from "next/link";
import Logo from "./SVG/Logo";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center py-6 w-[90%] mx-auto z-50">
      <Link href="/">
        <a className="cursor-pointer">
          <Logo />
        </a>
      </Link>

      <nav className="space-x-6">
        <Link href="/feedback">
          <a className="text-gray-600 transition hover:text-gray-400">
            Help us improve
          </a>
        </Link>

        <Link href="/access">
          <a className="inline-block bg-gradient-to-r from-light to-primary px-4 py-2 rounded-full text-white font-bold">
            Get early access
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

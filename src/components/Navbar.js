import { Popover, Menu } from "@headlessui/react";

import Link from "next/link";
import Logo from "./SVG/Logo";

import SignUp from "./SignUp";

import useAuth from "hooks/useAuth";
import SignIn from "./SignIn";

const Navbar = () => {
  const { user, logout, openSignIn, openSignUp, setOpenSignIn, setOpenSignUp } =
    useAuth();

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center py-6 w-[90%] mx-auto z-50">
      <Link href="/">
        <a className="cursor-pointer">
          <Logo />
        </a>
      </Link>

      {/* desktop nav */}
      <nav className="space-x-6 flex items-center">
        <a
          href="https://airtable.com/shr5zMoQ5rFQYi5kF"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 transition hover:text-gray-400 hidden md:block"
        >
          Help us improve
        </a>

        {/* Auth buttons */}
        {!user && (
          <>
            <button
              onClick={() => setOpenSignIn(true)}
              className="text-gray-600 transition hover:text-gray-400 hidden md:block"
            >
              Login
            </button>

            <button
              onClick={() => setOpenSignUp(true)}
              className=" hidden md:inline-block bg-gradient-to-r from-light to-primary px-4 py-2 rounded-full text-white font-bold"
            >
              Get early access
            </button>
          </>
        )}

        {user && (
          <Popover className="relative">
            <Popover.Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Popover.Button>

            <Popover.Panel className="absolute z-20 right-0 top-full mt-8">
              <section className="bg-dark p-4 w-full md:w-[240px] rounded-lg shadow-xl border border-gray-500">
                <article className="space-y-3 text-gray-500">
                  <h2 className="font-bold font-display text-md text-white">
                    Your info
                  </h2>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <h4>{user.name}</h4>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>

                    <h4>{user.email}</h4>
                  </div>
                </article>

                <hr className="border-gray-500 my-4" />

                <button
                  onClick={async () => await logout()}
                  className="w-full text-center text-white font-display font-bold bg-red-700 py-2 rounded-lg transition hover:bg-red-800"
                >
                  Log out
                </button>
              </section>
            </Popover.Panel>
          </Popover>
        )}

        {!user && (
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setOpenSignUp(true)}
              className="inline-block bg-gradient-to-r from-light to-primary px-4 py-2 rounded-full text-white font-bold"
            >
              Get early access
            </button>

            {/* mobile nav */}
            <Menu as="nav" className="relative">
              <Menu.Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white transform translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </Menu.Button>

              <Menu.Items className="absolute right-0 w-max mt-6 bg-dark border border-gray-500 p-4 rounded-xl flex flex-col space-y-4 text-center">
                <Menu.Item>
                  <button
                    onClick={() => setOpenSignIn(true)}
                    className="text-gray-600 transition hover:text-gray-400"
                  >
                    Login
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <Link href="/feedback">
                    <a className="text-gray-600 transition hover:text-gray-400">
                      Help us improve
                    </a>
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        )}
      </nav>

      {/* Register modal */}
      <SignUp open={openSignUp} setOpen={setOpenSignUp} />

      {/* Login modal */}
      <SignIn open={openSignIn} setOpen={setOpenSignIn} />
    </header>
  );
};

export default Navbar;

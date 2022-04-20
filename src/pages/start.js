import { Fragment } from "react";
import { useRouter } from "next/router";

import { Tab } from "@headlessui/react";

import Logo from "components/SVG/Logo";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import useAuth from "hooks/useAuth";

const Start = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  if (user) push("/");

  return (
    <main
      className="h-screen w-full bg-cover bg-dark grid place-items-center"
      style={{
        backgroundImage: `url("/assets/start-bg.png")`,
      }}
    >
      <article className="text-center">
        {/* logo */}

        <Logo center />

        <Tab.Group>
          <Tab.List
            as="ul"
            className="w-max mx-auto space-x-12 mb-10 text-xl flex justify-between items-center md:text-2xl text-white"
          >
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`border-b-4 border-transparent hover:border-purple-400 rounded-md ${
                    selected && "border-purple-400"
                  }`}
                >
                  Login
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`border-b-4 border-transparent hover:border-purple-400 rounded-md ${
                    selected && "border-purple-400"
                  }`}
                >
                  Sign Up
                </button>
              )}
            </Tab>
          </Tab.List>

          {/* Tab components */}

          <Tab.Panels>
            <Tab.Panel>
              <SignIn />
            </Tab.Panel>
            <Tab.Panel>
              <SignUp />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </article>
    </main>
  );
};

export default Start;

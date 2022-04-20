import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { Tab } from "@headlessui/react";

import Logo from "components/SVG/Logo";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import useAuth from "hooks/useAuth";
import Head from "next/head";
import WhatIsMahalo from "components/WhatIsMahalo";

const Start = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const [mahaloModal, setMahaloModal] = useState(false);

  if (user) push("/");

  return (
    <main
      className="h-screen w-full bg-cover bg-dark grid place-items-center"
      style={{
        backgroundImage: `url("/assets/start-bg.png")`,
      }}
    >
      {/* SEO HEAD */}
      <Head>
        <title>Mahalo TV - Get started.</title>
      </Head>

      {/* black overlay */}
      <div
        className="fixed inset-0 w-screen h-screen bg-black opacity-50"
        style={{
          zIndex: 0,
        }}
      ></div>

      <article className="text-center z-10">
        {/* logo */}

        <Logo center big />

        <Tab.Group>
          <Tab.List
            as="ul"
            className="w-max mx-auto space-x-8 text-xl mt-6 flex justify-between items-center md:text-2xl text-white"
          >
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`border-b-4 border-transparent text-base font-bold hover:border-purple-400 rounded-md ${
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
                  className={`border-b-4 border-transparent text-base font-bold hover:border-purple-400 rounded-md ${
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
              <SignUp setOpen={setMahaloModal} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </article>

      <WhatIsMahalo open={mahaloModal} setOpen={setMahaloModal} />
    </main>
  );
};

export default Start;

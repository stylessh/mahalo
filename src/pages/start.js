import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { Tab } from "@headlessui/react";

import Logo from "components/SVG/Logo";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import useAuth from "hooks/useAuth";
import Head from "next/head";
import WhatIsMahalo from "components/WhatIsMahalo";

const LoginMessage = () => {
  return (
    <p className="text-white text-center my-6 px-4">
      We are right now running a BETA test of our website. You can only enter if
      you have an login.
    </p>
  );
};

const RegisterMessage = ({ setOpen }) => {
  return (
    <p className="text-white text-center my-6 px-4">
      Be the first one to enter our final stage. Sign up now! <br />
      <button onClick={() => setOpen(true)}>
        What is <span className="text-light font-bold">MahaloTV</span>
      </button>
    </p>
  );
};

const Start = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
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

      <article className="text-center">
        {/* logo */}

        <Logo center />

        <Tab.Group
          onChange={(index) => {
            setCurrentIndex(index);
          }}
        >
          <Tab.List
            as="ul"
            className="w-max mx-auto space-x-12 text-xl flex justify-between items-center md:text-2xl text-white"
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

          {currentIndex === 0 && <LoginMessage />}
          {currentIndex === 1 && <RegisterMessage setOpen={setMahaloModal} />}

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

      <WhatIsMahalo open={mahaloModal} setOpen={setMahaloModal} />
    </main>
  );
};

export default Start;

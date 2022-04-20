import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const WhatIsMahalo = ({ open, setOpen }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="flex justify-center items-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-[90%] mx-auto md:w-[40%] p-8 md:p-16 overflow-hidden transition-all transform bg-dark shadow-xl rounded-2xl border-2 border-gray-500">
              {/* close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <Dialog.Title
                as="h3"
                className="text-4xl font-bold font-display text-white mb-8"
              >
                What is MahaloTV?
              </Dialog.Title>

              <article className="text-white space-y-4">
                <p>
                  MahaloTV’s main goal is to create one place with every
                  streaming service, so you don’t have to browse through many
                  different providers just to find one movie. Our platform is
                  primarily designed to solve the pain of getting no results
                  when searching for a specific movie, series, or documentary.
                </p>

                <p>
                  We will have every streaming service in one place! As it
                  should be.
                </p>

                <p>We will have a website, TV app, and Phone app.</p>

                <p>
                  We have many great ideas for the best solution to this
                  problem, but we will also love to hear some of your ideas.
                </p>

                <p>
                  <a
                    href="https://airtable.com/shr5zMoQ5rFQYi5kF"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    Fill out this form
                  </a>
                  , and help us create the best content website the world has
                  ever seen.
                </p>
              </article>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WhatIsMahalo;

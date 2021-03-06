import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

import allProviders from "data.json";
import getProviderImage from "utils/getProviderImage";

import { updateUserProviders } from "services/users";
import useAuth from "hooks/useAuth";
import useProviders from "hooks/useProviders";

import useMovies from "hooks/useMovies";

const CustomServices = ({ open, setOpen }) => {
  const { user } = useAuth();
  const { customMoviesPage, setCustomMovies } = useMovies();
  const { activatedProviders, setActivatedProviders, providersIds } =
    useProviders();
  const [providers, _] = useState([...allProviders]);

  const handleSelect = (provider) => {
    // if provider is already on the list, remove it
    if (
      activatedProviders.find(
        (item) => item.provider_id === provider.provider_id
      )
    ) {
      setActivatedProviders(
        activatedProviders.filter(
          (item) => item.provider_id !== provider.provider_id
        )
      );
    } else {
      // otherwise, add the provider
      setActivatedProviders([...activatedProviders, provider]);
    }
  };

  const handleSubmit = async () => {
    await toast.promise(updateUserProviders(user.id, activatedProviders), {
      success: "Providers list updated.",
      loading: "Updating list...",
      error: "An error has ocurred while updating providers.",
    });

    const { data } = await axios.get("/api/movies/custom", {
      params: {
        providers: [...new Set(providersIds)].join("|"),
        page: customMoviesPage,
      },
    });

    setCustomMovies(data);

    setOpen(false);
  };

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
            <div className="inline-block w-[90%] mx-auto md:w-[60%] p-16 overflow-hidden transition-all transform bg-dark shadow-xl rounded-2xl border-2 border-gray-500">
              <Dialog.Title
                as="h3"
                className="text-white font-tight text-3xl pb-4 text-center"
              >
                Combine{" "}
                <span className="font-display font-bold">Your Services</span>
              </Dialog.Title>

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

              <section className="h-[400px] overflow-y-auto providers-list">
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                  {providers.map((provider) => {
                    const isSelected = activatedProviders.find(
                      (item) => item.provider_id === provider.provider_id
                    );

                    return (
                      <li key={provider.provider_id}>
                        <button
                          onClick={() => handleSelect(provider)}
                          className={`flex items-center outline-none w-full border-2 p-2 ${
                            isSelected
                              ? "text-white border-2 border-light rounded-md"
                              : "text-gray-500 border-transparent"
                          } hover:text-white`}
                        >
                          <img
                            src={getProviderImage(
                              provider.provider_id,
                              provider.logo_path
                            )}
                            alt={provider.provider_name}
                            className="h-12 object-contain rounded-md mx-auto w-[132px]"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <button
                onClick={handleSubmit}
                className="block mt-6 w-max mx-auto text-white border-2 border-light py-4 px-16 text-center font-bold font-display rounded-lg transition hover:bg-light"
              >
                Save
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomServices;

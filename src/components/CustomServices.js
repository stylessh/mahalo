import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

import providers from "data.json";
import getProviderImage from "utils/getProviderImage";

const CustomServices = ({ open, setOpen }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (provider) => {
    if (selected.includes(provider)) {
      setSelected(selected.filter((item) => item !== provider));
    } else {
      setSelected([...selected, provider]);
    }
  };

  const handleSubmit = () => {
    console.log(selected);

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

              <section className="h-[400px] overflow-y-auto providers-list">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                  {providers.map((provider) => {
                    const isSelected = selected.includes(provider);

                    return (
                      <li key={provider.provider_id}>
                        <button
                          onClick={() => handleSelect(provider)}
                          className={`flex items-center outline-none w-full ${
                            isSelected ? "text-white" : "text-gray-500"
                          } hover:text-white`}
                        >
                          <img
                            src={getProviderImage(
                              provider.provider_id,
                              provider.logo_path
                            )}
                            alt={provider.provider_name}
                            className="w-14 h-14 object-contain rounded-md mr-4"
                          />

                          <h4 className="font-bold text-left text-sm transition">
                            {provider.provider_name}
                          </h4>
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

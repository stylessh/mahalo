import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-hot-toast";
import useAuth from "hooks/useAuth";

const SignIn = ({ open, setOpen }) => {
  const { login, setOpenSignIn, setOpenSignUp } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = await login(credentials);

    if (error) {
      toast.error(error, {
        duration: 5000,
      });
      return;
    }

    setOpen(false);

    toast.success("User logged in successfully!", {
      duration: 5000,
    });
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
            <div className="inline-block w-[90%] mx-auto md:w-[40%] p-16 overflow-hidden transition-all transform bg-dark shadow-xl rounded-2xl border-2 border-gray-500">
              <Dialog.Title
                as="h3"
                className="text-white font-display font-bold text-3xl pb-4 text-center"
              >
                Welcome back, please log in!
              </Dialog.Title>

              <form className="my-4 space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full py-2 px-4 bg-transparent border border-gray-600 rounded-lg outline-none text-white font-tight placeholder:text-gray-600"
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full py-2 px-4 bg-transparent border border-gray-600 rounded-lg outline-none text-white font-tight placeholder:text-gray-600"
                />
              </form>

              <button
                onClick={() => {
                  setOpenSignIn(false);

                  setTimeout(() => {
                    setOpenSignUp(true);
                  }, 500);
                }}
                className="mb-6 text-sm text-gray-500 hover:underline"
              >
                {"Don't have an account? "}
                <span className="text-light">Create one</span>
              </button>

              <button
                onClick={async (e) => await handleSubmit(e)}
                className="font-display font-bold text-white w-max mx-auto block text-2xl transition hover:text-gray-300"
              >
                Sign In
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignIn;

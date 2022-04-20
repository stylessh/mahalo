import { useState } from "react";

import { toast } from "react-hot-toast";

import useAuth from "hooks/useAuth";

const SignUp = () => {
  const { signUp, setOpenSignIn, setOpenSignUp } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = await signUp(credentials);

    if (error) {
      toast.error(error, {
        duration: 5000,
      });
      return;
    }

    toast.success("User created successfully!", {
      duration: 5000,
    });
  };

  return (
    <article className="w-[90%] mx-auto p-8 md:p-16 overflow-hidden transition-all transform bg-dark shadow-xl rounded-2xl border-2 border-gray-500">
      <h3 className="text-white font-display font-bold text-xl md:text-3xl pb-4">
        Registration
      </h3>

      <form className="my-4 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-transparent border border-gray-600 rounded-lg outline-none text-white font-tight placeholder:text-gray-600"
        />

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

      <button className="mb-6 text-sm text-gray-500 hover:underline">
        Already have an account? <span className="text-light">Log In</span>
      </button>

      <p className="text-gray-600 text-sm my-6 text-center">
        By signin up you agree to receiving product related updates.
      </p>

      {/* divider */}
      <div className="w-full h-[1px] bg-gray-600 mb-4"></div>

      <button
        onClick={async (e) => await handleSubmit(e)}
        className="font-display font-bold text-white w-max mx-auto block text-2xl transition hover:text-gray-300"
      >
        Sign Up
      </button>
    </article>
  );
};

export default SignUp;

import { useState } from "react";

import { toast } from "react-hot-toast";

import useAuth from "hooks/useAuth";

const SignUp = ({ setOpen }) => {
  const { signUp } = useAuth();

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
    <article className="w-[90%] md:w-[60%] mx-auto p-8 overflow-hidden transition-all transform bg-transparent text-white">
      <h3 className="text-white text-sm pb-4">
        Be the first one to enter our final stage. Sign up now! <br />
        <button onClick={() => setOpen(true)}>
          What is <span className="text-light font-bold">MahaloTV</span>
        </button>
      </h3>

      <form className="my-4 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-black bg-opacity-80 border border-white rounded-2xl outline-none text-white font-tight placeholder:text-white"
        />

        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-black bg-opacity-80 border border-white rounded-2xl outline-none text-white font-tight placeholder:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-black bg-opacity-80 border border-white rounded-2xl outline-none text-white font-tight placeholder:text-white"
        />
      </form>

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

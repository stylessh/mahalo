import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "hooks/useAuth";

const SignIn = () => {
  const { login } = useAuth();

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

    toast.success("User logged in successfully!", {
      duration: 5000,
    });
  };

  return (
    <article className="w-[90%] mx-auto p-8 md:p-16 overflow-hidden transition-all transform bg-dark shadow-xl rounded-2xl border-2 border-gray-500">
      <h3 className="text-white font-display font-bold text-xl md:text-3xl pb-4 text-center">
        Welcome back, please log in!
      </h3>

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

      <button className="mb-6 text-sm text-gray-500 hover:underline">
        {"Don't have an account? "}
        <span className="text-light">Create one</span>
      </button>

      <button
        onClick={async (e) => await handleSubmit(e)}
        className="font-display font-bold text-white w-max mx-auto block text-2xl transition hover:text-gray-300"
      >
        Sign In
      </button>
    </article>
  );
};

export default SignIn;

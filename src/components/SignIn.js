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
    <article className="w-[90%] mx-auto p-8 overflow-hidden transition-all transform bg-transparent rounded-2xl">
      <h3 className="text-white text-sm pb-4 text-center">
        We are right now running a BETA test of our website. <br /> You can only
        enter if you have an login.
      </h3>

      <form className="my-4 space-y-4 outline-none">
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
        Sign In
      </button>
    </article>
  );
};

export default SignIn;

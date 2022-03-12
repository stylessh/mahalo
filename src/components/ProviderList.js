import { useState } from "react";

const ProviderList = () => {
  const [providers, setProviders] = useState(new Array(5).fill(0));

  return (
    <article>
      <ul className="w-max mx-auto overflow-x-auto flex items-center space-x-4">
        {providers.map((provider, index) => (
          <li
            key={index}
            className="w-[200px] h-16 bg-slate-200 rounded-md"
          ></li>
        ))}
      </ul>
    </article>
  );
};

export default ProviderList;

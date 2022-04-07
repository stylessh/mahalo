import useProviders from "hooks/useProviders";

const ProviderList = () => {
  const { providers } = useProviders();

  return (
    <article>
      <ul className="w-max mx-auto overflow-x-auto flex items-center space-x-4">
        {providers.map((provider, index) => (
          <li key={index} className="w-[200px] h-16 bg-slate-200 rounded-md">
            <img
              src={`/assets/providers/${provider.badge}`}
              alt={provider.name}
              className="object-cover w-full h-full rounded-md select-none"
            />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ProviderList;

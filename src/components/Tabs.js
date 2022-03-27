import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import ProviderList from "./ProviderList";
import AllServices from "./Tabs/AllServices";
import MyServices from "./Tabs/MyServices";
import CustomServices from "./Tabs/CustomServices";

const Tabs = () => {
  return (
    <Tab.Group as="section" className="relative w-[90%] mx-auto z-10">
      <Tab.List
        as="ul"
        className="w-[90%] mx-auto mb-10 text-xl flex justify-between items-center md:w-max md:space-x-12 md:text-2xl text-white"
      >
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-4 border-transparent hover:border-purple-400 rounded-md ${
                selected && "border-purple-400"
              }`}
            >
              All services
            </button>
          )}
        </Tab>

        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-4 border-transparent hover:border-purple-400 rounded-md ${
                selected && "border-purple-400"
              }`}
            >
              My services
            </button>
          )}
        </Tab>

        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-4 border-transparent hover:border-purple-400 rounded-md ${
                selected && "border-purple-400"
              }`}
            >
              Custome
            </button>
          )}
        </Tab>
      </Tab.List>

      {/* Provider list */}
      <ProviderList />

      {/* panels / all services - my services - custome */}
      <Tab.Panels>
        <Tab.Panel>
          <AllServices />
        </Tab.Panel>
        <Tab.Panel>
          <MyServices />
        </Tab.Panel>
        <Tab.Panel>
          <CustomServices />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;

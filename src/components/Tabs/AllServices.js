import { useState } from "react";

const AllServices = () => {
  const [items, setItems] = useState(new Array(25).fill(0));

  return (
    <section className="my-12">
      <ul className="grid grid-cols-5 gap-8">
        {items.map((item, index) => (
          <li key={index}>
            <div className="w-full h-[350px] bg-slate-300 rounded-md"></div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AllServices;

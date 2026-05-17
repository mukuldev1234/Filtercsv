const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        Dashboard
      </h1>

      <ul className="space-y-4">
        <li className="cursor-pointer">
          Leads
        </li>

        <li className="cursor-pointer">
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
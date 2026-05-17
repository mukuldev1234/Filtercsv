const Navbar = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        Smart Leads Dashboard
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
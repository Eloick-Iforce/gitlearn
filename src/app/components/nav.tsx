const NavBar = ({
  language,
  setLanguage,
  search,
  setSearch,
  gitCommands,
  setSelectedCategory,
}) => {
  return (
    <div className="fixed min-h-screen w-96 bg-red-500 p-8">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 bg-red-500 text-2xl text-white focus:outline-none"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher une commande"
        className="mb-16 w-full rounded border bg-red-500 p-2 placeholder:text-gray-100"
      />
      <div className="flex flex-col items-start gap-8">
        {Object.keys(gitCommands).map((category) => (
          <button
            key={category}
            className="mb-2 text-2xl text-white"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
